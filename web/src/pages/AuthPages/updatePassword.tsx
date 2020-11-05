import React, { useState } from 'react';

import '../../styles/pages/update-password.css';

import Aside from '../../components/Aside';
import Input from '../../components/Input';
// import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  return (
    <div id="update-password-page">
      <Aside />

      <main>
        <div id="main-container">
          <h1>Esqueci a senha</h1>

          <span>
            Escolha uma nova senha para você acessar o dashboard do Happy
          </span>

          <Input label="Senha" value={email} setInput={setEmail} />
          <Input
            label="Confirmação da senha"
            value={email}
            setInput={setEmail}
          />

          <button onClick={() => {}}>Entrar</button>
        </div>
      </main>
    </div>
  );
}
