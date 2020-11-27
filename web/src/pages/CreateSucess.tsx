import React from 'react';

import PeopleIcon from '../images/people.svg';

import '../styles/pages/create-success.css';

function CreateSucesspage() {
  return (
    <div id="create-succes-page">
      <main>
        <h1>Ebaaa!</h1>
        <p>
          O cadastro deu certo e foi enviado ao administrador para ser aprovado.
        </p>
        <p>Agora é só esperar :)</p>
        <button>Voltar para o mapa</button>
      </main>
      <aside>
        <img src={PeopleIcon} alt="" />
      </aside>
    </div>
  );
}

export default CreateSucesspage;
