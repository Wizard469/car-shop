import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Car service', function () {
  it('should create a new car SUCCESSFULLY', async function () {
    // Arrange
    const newCarInput: ICar = {
      model: 'Commander',
      year: 2021,
      color: 'black',
      status: true,
      buyValue: 279000,
      doorsQty: 4,
      seatsQty: 7,
    };

    const newCarOutput: Car = new Car({
      id: 'car-01',
      model: 'Commander',
      year: 2021,
      color: 'black',
      status: true,
      buyValue: 279000,
      doorsQty: 4,
      seatsQty: 7,
    });

    Sinon.stub(Model, 'create').resolves(newCarOutput);

    // Act
    const service = new CarService();
    const result = await service.create(newCarInput);

    // Assert
    expect(result).to.be.deep.equal(newCarOutput);
  });
});
