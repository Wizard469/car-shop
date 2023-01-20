import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import { carsArray, updatedCar, validCar, validCarOutput } from '../../__mocks__/CarsMock';

const service = new CarService();
const INVALID_ID_FORMAT = 'invalid-id-format';
const INVALID_MONGO_ID = 'Invalid mongo id';
const CAR_NOT_FOUND = 'Car not found';

describe('Car service', function () {
  describe('Post route', function () {
    it('should create a new car SUCCESSFULLY', async function () {
      // Arrange
      Sinon.stub(Model, 'create').resolves(new Car(validCarOutput));

      // Act
      const result = await service.create(validCar);

      // Assert
      expect(result).to.be.deep.equal(validCarOutput);
      Sinon.restore();
    });
  });

  describe('Get routes', function () {
    it('should find all cars', async function () {
      // Arrange
      Sinon.stub(Model, 'find').resolves(carsArray);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).to.be.deep.equal(carsArray);
    });

    it('should find car by id', async function () {
      // Arrange
      Sinon.stub(Model, 'findById').resolves(new Car(validCarOutput));

      // Act
      const result = await service.findById('634852326b35b59438fbea2f');

      // Assert
      expect(result).to.be.deep.equal(validCarOutput);
    });

    it('should throw an exception by passing an invalid id format', async function () {
      // Act
      try {
        await service.findById(INVALID_ID_FORMAT);
      } catch (err) {
        // Assert
        expect((err as Error).message).to.be.equal(INVALID_MONGO_ID);
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
        expect((err as Error).message).to.be.equal(CAR_NOT_FOUND);
      }
    });

    afterEach(function () { Sinon.restore(); });
  });

  describe('Put routes', function () {
    it('should update a car SUCCESSFULLY', async function () {
      // Arrange
      Sinon.stub(Model, 'findById').resolves(validCarOutput);
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(updatedCar);

      // Act
      const result = await service.updateOne('634852326b35b59438fbea2f', updatedCar);

      // Assert
      expect(result).to.be.deep.equal(updatedCar);
    });

    it(
      'should throw an exception by trying to update with an invalid id format',
      async function () {
        // Act
        try {
          await service.updateOne(INVALID_ID_FORMAT, updatedCar);
        } catch (err) {
          // Assert
          expect((err as Error).message).to.be.equal(INVALID_MONGO_ID);
        }
      },
    );

    it('should throw an exception by trying to update with a wrong id', async function () {
      // Arrange
      Sinon.stub(Model, 'findById').resolves();

      // Act
      try {
        await service.updateOne('134452925b35b59438fbea2f', updatedCar);
      } catch (err) {
        // Assert
        expect((err as Error).message).to.be.equal(CAR_NOT_FOUND);
      }
    });

    afterEach(function () { Sinon.restore(); });
  });

  describe('Delete routes', function () {
    it('should delete a car SUCCESSFULLY', async function () {
      // Arrange
      Sinon.stub(Model, 'findById').resolves(validCarOutput);
      Sinon.stub(Model, 'findByIdAndDelete').resolves();

      // Act
      const result = await service.deleteOne('634852326b35b59438fbea2f');

      // Assert
      expect(result).to.be.equal('Car deleted successfully');
    });

    it('should throw an exception by trying to delete with a wrong id', async function () {
      // Arrange
      Sinon.stub(Model, 'findById').resolves();

      // Act
      try {
        await service.deleteOne('644862346b36b59438fbea2d');
        // Assert
      } catch (err) {
        expect((err as Error).message).to.be.equal(CAR_NOT_FOUND);
      }
    });

    afterEach(function () { Sinon.restore(); });
  });
});
