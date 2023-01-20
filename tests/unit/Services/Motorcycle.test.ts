import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import {
  motorcyclesArray,
  updatedMotorcycle,
  validMotorcycle,
  validMotorcycleOutput,
} from '../../__mocks__/MotorcyclesMock';

const service = new MotorcycleService();

describe('Motorcycle service', function () {
  describe('Post route', function () {
    it('should create a new motorcycle SUCCESSFULLY', async function () {
      // Arrange
      Sinon.stub(Model, 'create').resolves(new Motorcycle(validMotorcycleOutput));

      // Act
      const result = await service.create(validMotorcycle);

      // Assert
      expect(result).to.be.deep.equal(validMotorcycleOutput);
      Sinon.restore();
    });
  });

  describe('Get routes', function () {
    it('should find all motorcycles', async function () {
      // Arrange
      Sinon.stub(Model, 'find').resolves(motorcyclesArray);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).to.be.deep.equal(motorcyclesArray);
    });

    it('should find motorcycle by id', async function () {
      // Arrange
      Sinon.stub(Model, 'findById').resolves(new Motorcycle(validMotorcycleOutput));

      // Act
      const result = await service.findById('634862336b35b59438fbea2d');

      // Assert
      expect(result).to.be.deep.equal(validMotorcycleOutput);
    });

    it('should throw an exception by passing an invalid id format', async function () {
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

  describe('Put routes', function () {
    it('should update a motorcycle SUCCESSFULLY', async function () {
      // Arrange
      Sinon.stub(Model, 'findById').resolves(validMotorcycleOutput);
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(updatedMotorcycle);

      // Act
      const result = await service.updateOne('634862336b35b59438fbea2d', updatedMotorcycle);

      // Assert
      expect(result).to.be.deep.equal(updatedMotorcycle);
    });

    it(
      'should throw an exception by trying to update with an invalid id format',
      async function () {
        // Act
        try {
          await service.updateOne('invalid-id', updatedMotorcycle);
        } catch (err) {
          // Assert
          expect((err as Error).message).to.be.equal('Invalid mongo id');
        }
      },
    );

    it('should throw an exception by trying to update with a wrong id', async function () {
      // Arrange
      Sinon.stub(Model, 'findById').resolves();

      // Act
      try {
        await service.updateOne('634862236b34b59478fbea2d', updatedMotorcycle);
      } catch (err) {
        // Assert
        expect((err as Error).message).to.be.equal('Motorcycle not found');
      }
    });

    afterEach(function () { Sinon.restore(); });
  });
});
