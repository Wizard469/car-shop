import ICar from '../../src/Interfaces/ICar';

export const validCar: ICar = {
  model: 'Commander',
  year: 2021,
  color: 'black',
  buyValue: 279000,
  doorsQty: 4,
  seatsQty: 7,
};

export const validCarOutput: ICar = {
  id: '634852326b35b59438fbea2f',
  model: 'Commander',
  year: 2021,
  color: 'black',
  status: false,
  buyValue: 279000,
  doorsQty: 4,
  seatsQty: 7,
};

export const updatedCar: ICar = {
  id: '634852326b35b59438fbea2f',
  model: 'Commander',
  year: 2022,
  color: 'black',
  status: true,
  buyValue: 310000,
  doorsQty: 4,
  seatsQty: 7,
};

export const carsArray: ICar[] = [
  {
    id: '634852326b35b59438fbea2f',
    model: 'Commander',
    year: 2022,
    color: 'black',
    status: true,
    buyValue: 310000,
    doorsQty: 4,
    seatsQty: 7,
  },
  {
    id: '634852326b35b59438fbea31',
    model: 'Tempra',
    year: 1995,
    color: 'Black',
    status: true,
    buyValue: 39.000,
    doorsQty: 2,
    seatsQty: 5,
  },
];
