import { Router } from 'express';
import CarRoutes from './car.routes';

const routes = Router();

routes.use('/cars', CarRoutes);

export default routes;
