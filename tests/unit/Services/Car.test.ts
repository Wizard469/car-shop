import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import { carsArray, validCar, validCarOutput } from '../../__mocks__/CarsMock';

describe('Car service', function () {
  it('should create a new car SUCCESSFULLY', async function () {
    // Arrange
    const newCarInput: ICar = validCar;

    const newCarOutput: Car = new Car(validCarOutput);

    Sinon.stub(Model, 'create').resolves(newCarOutput);

    // Act
    const service = new CarService();
    const result = await service.create(newCarInput);

    // Assert
    expect(result).to.be.deep.equal(newCarOutput);
  });

  it('should find all cars', async function () {
    // Arrange
    const carsList: ICar[] = carsArray;

    Sinon.stub(Model, 'find').resolves(carsList);

    // Act
    const service = new CarService();
    const result = await service.findAll();

    // Assert
    expect(result).to.be.deep.equal(carsList);
  });

  it('should find car by id', async function () {
    // Arrange
    const carOutput: Car = new Car(validCarOutput);

    Sinon.stub(Model, 'findById').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.findById('634852326b35b59438fbea2f');

    // Assert
    expect(result).to.be.deep.equal(carOutput);
  });

  it('should throw an exception by passing an invalid id format', async function () {
    // Arrange
    Sinon.stub(Model, 'findById').resolves({});

    // Act
    try {
      const service = new CarService();
      await service.findById('invalid-id');
    } catch (err) {
      // Assert
      expect((err as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  afterEach(function () { Sinon.restore(); });
});
