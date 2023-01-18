import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  async create() {
    try {
      const newBike = await this.service.create(this.req.body);

      this.res.status(201).json(newBike);
    } catch (err) {
      this.next(err);
    }
  }

  async findAll() {
    try {
      const allBikes = await this.service.findAll();

      this.res.status(200).json(allBikes);
    } catch (err) {
      this.next(err);
    }
  }

  async findById() {
    try {
      const bike = await this.service.findById(this.req.params.id);

      this.res.status(200).json(bike);
    } catch (err) {
      this.next(err);
    }
  }
}
