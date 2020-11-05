import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import '../../styles/pages/update-password.css';

import Aside from '../../components/Aside';
import Input from '../../components/Input';
import api from '../../services/api';

interface pageParams {
  token: string;
}

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { token } = useParams<pageParams>();

  const history = useHistory();

  async function handleUpdatePassword() {
    if (password === passwordConfirm) {
      await api
        .post(
          'recovery_password',
          {
            password,
          },
          {
            params: { token },
          }
        )
        .then(() => {
          history.push('/');
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert('As senhas não são iguais');
    }
  }

  return (
    <div id="update-password-page">
      <Aside />

      <main>
        <div id="main-container">
          <h1>Esqueci a senha</h1>

          <span>
            Escolha uma nova senha para você acessar o dashboard do Happy
          </span>

          <Input
            label="Senha"
            value={password}
            setInput={setPassword}
            type="password"
          />
          <Input
            label="Confirmação da senha"
            value={passwordConfirm}
            setInput={setPasswordConfirm}
            type="password"
          />

          <button
            className={
              password.length >= 6 && passwordConfirm.length >= 6
                ? 'button-active'
                : ''
            }
            onClick={handleUpdatePassword}
          >
            Entrar
          </button>
        </div>
      </main>
    </div>
  );
}
