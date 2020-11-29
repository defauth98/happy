import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import BadPeopleIcon from '../images/bad-people.svg';
import api from '../services/api';

import '../styles/pages/confirm-delete.css';

interface PageParams {
  id: string;
}

interface Orphanage {
  name: string;
}

function ConfirmDeletePage() {
  const history = useHistory();
  const [name, setName] = useState('');
  const params = useParams<PageParams>();

  useEffect(() => {
    api.get(`/orphanages/${params.id}`).then((response) => {
      setName(response.data.name);
    });
  }, [params.id]);

  function handleNavigateToMap() {
    history.push('/');
  }

  return (
    <div id="confirm-delete">
      <main>
        <h1>Excluir!</h1>
        <p>Você tem certeza que quer excluir {name}</p>
        <button onClick={handleNavigateToMap}>Voltar para o mapa</button>
      </main>
      <aside>
        <img src={BadPeopleIcon} alt="" />
      </aside>
    </div>
  );
}

export default ConfirmDeletePage;
