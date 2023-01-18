import { Router } from 'express';
import CarRoutes from './car.routes';
import MotorcycleRoutes from './motorcycle.routes';

const routes = Router();

routes.use('/cars', CarRoutes);
routes.use('/motorcycles', MotorcycleRoutes);

export default routes;
