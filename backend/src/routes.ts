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
routes.delete('/orphanages/:id', OrphangesController.delete);
routes.put(
  '/orphanages/:id',
  upload.array('images'),
  OrphangesController.update
);

routes.post('/users', AuthController.create);
routes.post('/login', AuthController.loginUser);

routes.post('/validade-email', AuthController.validadeEmail);
routes.post('/recovery-password', AuthController.recoveryPassword);

export default routes;
