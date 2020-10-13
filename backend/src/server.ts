import express from 'express';
import { getRepository } from 'typeorm';
import Orphanages from './models/Orphanages';

import './database/connection';

const app = express();

app.use(express.json());

app.post('/orphanages', async (request, response) => {
  const {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  } = request.body;

  // O typeorm usa o pattern chamado repository, ou seja, tudo precisa passar por
  // esse repository, por que ele que contem as regras de negocio
  const orphanagesRepository = getRepository(Orphanages);

  // Cria uma instancia de orfanato
  const orphanage = orphanagesRepository.create({
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  });

  // Salva no banco de dados
  await orphanagesRepository.save(orphanage);

  return response.json(orphanage);
});

app.listen(3333);
