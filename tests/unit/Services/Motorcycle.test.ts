import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { validMotorcycle, validMotorcycleOutput } from '../../__mocks__/MotorcyclesMock';

describe('Motorcycle service', function () {
  it('should create a new motorcycle SUCCESSFULLY', async function () {
    // Arrange
    const newBikeInput: IMotorcycle = validMotorcycle;

    const newBikeOutput: Motorcycle = new Motorcycle(validMotorcycleOutput);

    Sinon.stub(Model, 'create').resolves(newBikeOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.create(newBikeInput);

    // Assert
    expect(result).to.be.deep.equal(newBikeOutput);
  });
});
