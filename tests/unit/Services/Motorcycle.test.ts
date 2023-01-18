import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import {
  motorcyclesArray,
  validMotorcycle,
  validMotorcycleOutput,
} from '../../__mocks__/MotorcyclesMock';

const service = new MotorcycleService();

describe('Motorcycle service', function () {
  it('should create a new motorcycle SUCCESSFULLY', async function () {
    // Arrange
    const newBikeInput: IMotorcycle = validMotorcycle;

    const newBikeOutput: Motorcycle = new Motorcycle(validMotorcycleOutput);

    Sinon.stub(Model, 'create').resolves(newBikeOutput);

    // Act
    const result = await service.create(newBikeInput);

    // Assert
    expect(result).to.be.deep.equal(newBikeOutput);
  });

  it('should find all motorcycles', async function () {
    // Arrange
    const motorcycleList: IMotorcycle[] = motorcyclesArray;

    Sinon.stub(Model, 'find').resolves(motorcycleList);

    // Act
    const result = await service.findAll();

    // Assert
    expect(result).to.be.deep.equal(motorcycleList);
  });

  it('should find motorcycle by id', async function () {
    // Arrange
    const bikeOutput: Motorcycle = new Motorcycle(validMotorcycleOutput);

    Sinon.stub(Model, 'findById').resolves(bikeOutput);

    // Act
    const result = await service.findById('634862336b35b59438fbea2d');

    // Assert
    expect(result).to.be.deep.equal(bikeOutput);
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
      expect((err as Error).message).to.be.equal('Motorcycle not found');
    }
  });

  afterEach(function () { Sinon.restore(); });
});
