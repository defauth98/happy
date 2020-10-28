import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Users from '../models/Users';

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
        message: 'Erro ao criar usuario',
      });
    }
  },
};
