import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import userView from "../views/user_view";
import Users from "../models/Users";
import mailer from "../modules/mailer";

const secret = process.env.APP_SECRET as string;

export const saltRounds = 10;

function generateToken(id: string) {
  return jwt.sign({ id }, secret, {
    expiresIn: 86400,
  });
}

export default {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const userRepository = getRepository(Users);

    var data = {
      email,
      password,
    };

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    await schema.validate(data, { abortEarly: false });

    try {
      await bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          data = {
            email,
            password: hash,
          };

          const user = userRepository.create(data);

          await userRepository.save(user);

          return response
            .status(201)
            .json({ user, token: generateToken(String(user?.id)) });
        });
      });
    } catch (error) {
      console.log(error.message);

      return response.status(400).json({
        message: "Erro ao criar usuario",
      });
    }
  },

  async loginUser(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const userRepository = getRepository(Users);

      const userAlreadyExists = await userRepository.findOne({ email });

      if (!userAlreadyExists?.email) {
        return response.status(400).json({ error: "Email não existe" });
      }

      const userPassword = userAlreadyExists.password;

      await bcrypt.compare(password, userPassword, function (err, result) {
        if (result) {
          const token = generateToken(String(userAlreadyExists?.id));

          return response
            .status(200)
            .json({ user: userView.render(userAlreadyExists), token });
        } else {
          return response
            .status(400)
            .json({ error: "Informe uma nova correta" });
        }
      });
    } catch (error) {
      console.log(error);

      return response
        .status(400)
        .json({ error: "Erro ao tentar fazer o login" });
    }
  },

  async validadeEmail(request: Request, response: Response) {
    const { email } = request.body;

    try {
      const userRepository = getRepository(Users);

      const userAlreadyExists = await userRepository.findOne({ email });

      if (!!userAlreadyExists === false)
        return response.status(400).json({ error: "Usuário não encontrado" });

      const token = crypto.randomBytes(20).toString("hex");

      const now = new Date();
      now.setHours(now.getHours() + 1);

      await userRepository.update(
        { email },
        { passwordResetToken: token, passwordResetExpires: String(now) }
      );

      const updatedUser = await userRepository.findOne({ email });

      await mailer.sendMail({
        from: "Happy <app@happy.com>",
        to: email,
        subject: "Recuperação de Senha",
        text: `Link para recuperar senha: http://localhost:3000/recovery-password/${token}`,
      });

      return response.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);

      return response
        .status(400)
        .json({ erro: "Erro ao tentar recuperar a senha" });
    }
  },

  async recoveryPassword(request: Request, response: Response) {
    const { password } = request.body;
    const { token } = request.query;

    if (!!token === false) {
      return response
        .status(400)
        .json({ error: "Não é possível alterar a senha sem um token" });
    }

    const userRepository = getRepository(Users);

    try {
      await bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          await userRepository.update(
            { passwordResetToken: String(token) },
            {
              password: hash,
              passwordResetToken: "",
              passwordResetExpires: "",
            }
          );

          return response
            .status(200)
            .json({ message: "Sucesso ao mudar a senha" });
        });
      });
    } catch (error) {
      console.log(error);

      return response
        .status(400)
        .json({ error: "Não foi possivel mudar a senha do usuário" });
    }
  },
};
