import { Router } from 'express';
import CarController from '../Controllers/CarController';

const route = Router();

route.post('/', (req, res, next) => new CarController(req, res, next).create());
route.get('/', (req, res, next) => new CarController(req, res, next).findAll());
route.get('/:id', (req, res, next) => new CarController(req, res, next).findById());
route.put('/:id', (req, res, next) => new CarController(req, res, next).updateOne());

const routes = route;

export default routes;
