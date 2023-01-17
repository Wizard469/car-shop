import { Router } from 'express';
import CarController from '../Controllers/CarController';

const route = Router();

route.post('/', (req, res) => new CarController(req, res).create());

const routes = route;

export default routes;
