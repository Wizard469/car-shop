import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import HttpCode from '../helpers/httpCodes';
import ICar from '../Interfaces/ICar';
import HttpException from '../middlewares/error/httpException';
import CarODM from '../Models/CarODM';

const CAR_NOT_FOUND = 'Car not found';

export default class CarService {
  private carODM = new CarODM();
  // private CAR_NOT_FOUND = 'Car not found';

  private isIdValid(id: string): void {
    if (!isValidObjectId(id)) {
      throw new HttpException(HttpCode.UNPROCESSABLE_ENTITY, 'Invalid mongo id'); 
    }
  }

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
    this.isIdValid(id);

    const car = await this.carODM.findById(id);

    if (!car) throw new HttpException(HttpCode.NOT_FOUND, CAR_NOT_FOUND);

    return this.createCarDomain(car);
  }

  async updateOne(id: string, data: ICar) {
    this.isIdValid(id);

    const car = await this.carODM.findById(id);

    if (!car) throw new HttpException(HttpCode.NOT_FOUND, CAR_NOT_FOUND);

    await this.carODM.updateOne(id, data);

    return this.createCarDomain({ id, ...data });
  }

  async deleteOne(id: string) {
    this.isIdValid(id);

    const car = await this.carODM.findById(id);

    if (!car) throw new HttpException(HttpCode.NOT_FOUND, CAR_NOT_FOUND);

    await this.carODM.deleteOne(id);

    return 'Car deleted successfully';
  }
}
