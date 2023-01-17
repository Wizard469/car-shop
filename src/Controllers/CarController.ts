import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  async create() {
    try {
      const newCar = await this.service.create(this.req.body);

      this.res.status(201).json(newCar);
    } catch (err) {
      this.next(err);
    }
  }

  async findAll() {
    try {
      const allCars = await this.service.findAll();
      console.log(allCars);

      this.res.status(200).json(allCars);
    } catch (err) {
      this.next(err);
    }
  }

  async findById() {
    try {
      const car = await this.service.findById(this.req.params.id);
      console.log(car);

      this.res.status(200).json(car);
    } catch (err) {
      this.next(err);
    }
  }
}