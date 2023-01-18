import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import HttpCode from '../helpers/httpCodes';
import IMotorcycle from '../Interfaces/IMotorcycle';
import HttpException from '../middlewares/error/httpException';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  private motorcycleODM = new MotorcycleODM();

  private createMotorcycleDomain(bike: IMotorcycle): Motorcycle {
    return new Motorcycle(bike);
  }

  async create(bike: IMotorcycle) {
    const newBike = await this.motorcycleODM.create(bike);

    return this.createMotorcycleDomain(newBike);
  }

  async findAll() {
    const allBikes = await this.motorcycleODM.findAll();
    
    return allBikes.map((bike) => this.createMotorcycleDomain(bike));
  }

  async findById(id: string) {
    if (!isValidObjectId(id)) {
      throw new HttpException(HttpCode.UNPROCESSABLE_ENTITY, 'Invalid mongo id'); 
    }

    const bike = await this.motorcycleODM.findById(id);

    if (!bike) throw new HttpException(HttpCode.NOT_FOUND, 'Motorcycle not found');

    return this.createMotorcycleDomain(bike);
  }
}
