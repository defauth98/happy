import React, { useState } from 'react';

import '../../styles/pages/login.css';

import Aside from '../../components/Aside';
import Input from '../../components/Input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <div id="login-page">
      <Aside />

      <main>
        <div id="main-container">
          <h1>Fazer login</h1>

          <Input label="E-mail" value={email} setInput={setEmail} />
          <Input
            label="Senha"
            value={password}
            setInput={setPassword}
            type="password"
          />

          <div id="buttons-container">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="remenber"
                value={String(remember)}
                onChange={(e) => {
                  setRemember(true);
                }}
              />
              <label htmlFor="remenber">Lembrar-me</label>
            </div>
            <a id="forget-password" href="#">
              Esqueci minha senha
            </a>
          </div>

          <button>Entrar</button>
        </div>
      </main>
    </div>
  );
}
