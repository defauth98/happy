import { Response, Request } from 'express';

import { getRepository } from 'typeorm';
import Orphanages from '../models/Orphanages';

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanages);

    const orphanages = await orphanagesRepository.find();

    return response.json(orphanages);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanages);

    const orphanage = await orphanagesRepository.findOneOrFail(id);

    return response.json(orphanage);
  },

  async create(request: Request, response: Response) {
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

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    // Cria uma instancia de orfanato
    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    });

    // Salva no banco de dados
    await orphanagesRepository.save(orphanage);

    // Código de resposta para criado com sucesso
    return response.status(201).json(orphanage);
  },
};
