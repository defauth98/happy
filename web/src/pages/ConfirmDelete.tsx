import React from 'react';
import { useHistory } from 'react-router-dom';

import BadPeopleIcon from '../images/bad-people.svg';

import '../styles/pages/confirm-delete.css';

// Pegar o orfanato via page params

function ConfirmDeletePage() {
  const history = useHistory();

  function handleNavigateToMap() {
    history.push('/');
  }
  return (
    <div id="confirm-delete">
      <main>
        <h1>Excluir!</h1>
        <p>Você tem certeza que quer exclui </p>
        <button onClick={handleNavigateToMap}>Voltar para o mapa</button>
      </main>
      <aside>
        <img src={BadPeopleIcon} alt="" />
      </aside>
    </div>
  );
}

export default ConfirmDeletePage;
