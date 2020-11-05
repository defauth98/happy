import React, { useState } from 'react';

import '../../styles/pages/validade-email.css';

import Aside from '../../components/Aside';
import Input from '../../components/Input';
// import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <div id="validade-email-page">
      <Aside />

      <main>
        <div id="main-container">
          <h1>Esqueci a senha</h1>

          <span>
            Sua redefinição de senha será enviada para o e-mail cadastrado.
          </span>

          <Input label="E-mail" value={email} setInput={setEmail} />

          <button onClick={() => {}}>Entrar</button>
        </div>
      </main>
    </div>
  );
}
