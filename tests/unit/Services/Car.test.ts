import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import { carsArray, updatedCar, validCar, validCarOutput } from '../../__mocks__/CarsMock';

const service = new CarService();

describe('Car service', function () {
  it('should create a new car SUCCESSFULLY', async function () {
    // Arrange
    const newCarInput: ICar = validCar;

    const newCarOutput: Car = new Car(validCarOutput);

    Sinon.stub(Model, 'create').resolves(newCarOutput);

    // Act
    const result = await service.create(newCarInput);

    // Assert
    expect(result).to.be.deep.equal(newCarOutput);
  });

  it('should find all cars', async function () {
    // Arrange
    const carsList: ICar[] = carsArray;

    Sinon.stub(Model, 'find').resolves(carsList);

    // Act
    const result = await service.findAll();

    // Assert
    expect(result).to.be.deep.equal(carsList);
  });

  it('should find car by id', async function () {
    // Arrange
    const carOutput: Car = new Car(validCarOutput);

    Sinon.stub(Model, 'findById').resolves(carOutput);

    // Act
    const result = await service.findById('634852326b35b59438fbea2f');

    // Assert
    expect(result).to.be.deep.equal(carOutput);
  });

  it('should throw an exception by passing an invalid id format', async function () {
    // Arrange
    Sinon.stub(Model, 'findById').resolves({});

    // Act
    try {
      await service.findById('invalid-id');
    } catch (err) {
      // Assert
      expect((err as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  it('should throw an exception by passing an wrong id', async function () {
    // Arrange
    Sinon.stub(Model, 'findById').resolves();

    // Act
    try {
      await service.findById('644862346b36b59438fbea2d');
    } catch (err) {
      // Assert
      expect((err as Error).message).to.be.equal('Car not found');
    }
  });

  it('should update a car SUCCESSFULLY', async function () {
    // Arrange
    Sinon.stub(Model, 'create').resolves(validCar);
    Sinon.stub(Model, 'findById').resolves(validCarOutput);
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(updatedCar);

    // Act
    const result = await service.updateOne('634852326b35b59438fbea2f', updatedCar);
      
    // Assert
    expect(result).to.be.deep.equal(updatedCar);
  });

  it('should throw an exception by trying to update with an invalid id format', async function () {
    // Arrange
    Sinon.stub(Model, 'update').resolves();

    // Act
    try {
      await service.updateOne('invalid-id', updatedCar);
    } catch (err) {
      // Assert
      expect((err as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  it('should throw an exception by trying to update with a wrong id', async function () {
    // Arrange
    Sinon.stub(Model, 'findById').resolves();

    // Act
    try {
      await service.updateOne('134452925b35b59438fbea2f', updatedCar);
    } catch (err) {
      // Assert
      expect((err as Error).message).to.be.equal('Car not found');
    }
  });

  afterEach(function () { Sinon.restore(); });
});
