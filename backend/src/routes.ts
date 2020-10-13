import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphangesController from './controllers/OrphangesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphangesController.index);
routes.get('/orphanages/:id', OrphangesController.show);
routes.post('/orphanages', upload.array('images'), OrphangesController.create);

export default routes;
