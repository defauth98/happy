import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphangesController from './controllers/OrphangesController';
import AuthController from './controllers/AuthController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphangesController.index);
routes.get('/orphanages/:id', OrphangesController.show);
routes.post('/orphanages', upload.array('images'), OrphangesController.create);

routes.post('/users', AuthController.create);
routes.post('/login', AuthController.loginUser);

export default routes;
