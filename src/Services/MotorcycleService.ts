import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
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
}
