import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import HttpCode from '../helpers/httpCodes';
import ICar from '../Interfaces/ICar';
import HttpException from '../middlewares/error/httpException';
import CarODM from '../Models/CarODM';

export default class CarService {
  private carODM = new CarODM();

  private createCarDomain(car: ICar): Car {
    return new Car(car);
  }

  async create(car: ICar) {
    const newCar = await this.carODM.create(car);

    return this.createCarDomain(newCar);
  }

  async findAll() {
    const allCars = await this.carODM.findAll();
    
    return allCars.map((car) => this.createCarDomain(car));
  }

  async findById(id: string) {
    if (!isValidObjectId(id)) {
      throw new HttpException(HttpCode.UNPROCESSABLE_ENTITY, 'Invalid mongo id'); 
    }

    const car = await this.carODM.findById(id);

    if (!car) throw new HttpException(HttpCode.NOT_FOUND, 'Car not found');

    return this.createCarDomain(car);
  }

  async updateOne(id: string, data: ICar) {
    if (!isValidObjectId(id)) {
      throw new HttpException(HttpCode.UNPROCESSABLE_ENTITY, 'Invalid mongo id'); 
    }

    const car = await this.carODM.findById(id);

    if (!car) throw new HttpException(HttpCode.NOT_FOUND, 'Car not found');

    await this.carODM.updateOne(id, data);

    const updatedCar = { id, ...data };

    return this.createCarDomain(updatedCar);
  }
}
