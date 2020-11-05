import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import '../../styles/pages/validade-email.css';

import Aside from '../../components/Aside';
import Input from '../../components/Input';
import api from '../../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  const history = useHistory();

  async function handleValidateEmail() {
    const response = await api.post('/validade-email', { email });

    if (String(response.status) === '200') {
      history.push('/landing');
    }
  }

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

          <button
            className={email.length > 6 ? 'button-active' : ''}
            onClick={handleValidateEmail}
          >
            Entrar
          </button>
        </div>
      </main>
    </div>
  );
}
