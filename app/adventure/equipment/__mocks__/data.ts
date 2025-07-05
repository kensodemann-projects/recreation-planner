import { Equipment, EquipmentType } from '@/models';
import { vi } from 'vitest';

export const EQUIPMENT_TYPES: EquipmentType[] = [
  {
    id: 1,
    name: 'Camper',
    description: 'A trailer or RV camper.',
  },
  {
    id: 2,
    name: 'Automobile',
    description: 'A car or truck',
  },
  {
    id: 3,
    name: 'Bicycle',
    description: 'Bicycle',
  },
  {
    id: 4,
    name: 'Furnishing',
    description: 'Tables, chairs, outdoor rugs, etc.',
  },
  {
    id: 5,
    name: 'Shelter',
    description: 'Popups, clams, etc.',
  },
  {
    id: 6,
    name: 'Accessories',
    description: 'Assorted items needed for camping such as grills.',
  },
];

export const EQUIPMENT: Equipment[] = [
  {
    id: 1,
    name: 'Ford Pinto',
    description: 'It blows up if you touch it, so be careful',
    purchaseDate: '1977-03-17',
    cost: 3024.34,
    manufacturer: 'Ford',
    model: 'Pinto Hatchback',
    identification: '299r00399f00-diifue',
    length: null,
    weight: null,
    capacity: '4 people, 2 suitcases',
    licensePlateNumber: 'WI-994-004',
    insuranceCarrier: null,
    insurancePolicyNumber: null,
    insuranceContactName: null,
    insuranceContactPhoneNumber: null,
    insuranceContactEmail: null,
    equipmentType: {
      id: 2,
      name: 'Automobile',
      description: 'A car or truck',
    },
  },
  {
    id: 2,
    name: 'The bare minimum',
    description: null,
    purchaseDate: null,
    cost: null,
    manufacturer: null,
    model: null,
    identification: null,
    length: null,
    weight: null,
    capacity: null,
    licensePlateNumber: null,
    insuranceCarrier: null,
    insurancePolicyNumber: null,
    insuranceContactName: null,
    insuranceContactPhoneNumber: null,
    insuranceContactEmail: null,
    equipmentType: {
      id: 6,
      name: 'Accessories',
      description: 'Assorted items needed for camping such as grills.',
    },
  },
  {
    id: 3,
    name: 'My Truck',
    description: 'Front Wheel Drive hybrid truck, set up for towing',
    purchaseDate: '2014-11-27',
    cost: 24584.34,
    manufacturer: 'Ford',
    model: 'Mavrick XLT FWD Hybrid',
    identification: 'this-is-not-my-vin',
    length: '16 Feet',
    weight: '3500 Pounds',
    capacity: '5 People, 4 Foot Bed',
    licensePlateNumber: 'WI-1984',
    insuranceCarrier: 'Bad Boys, Inc.',
    insurancePolicyNumber: '400200439-01',
    insuranceContactName: 'Bob Obrien',
    insuranceContactPhoneNumber: '555-049-3849',
    insuranceContactEmail: 'bobo@badboys.com',
    equipmentType: {
      id: 2,
      name: 'Automobile',
      description: 'A car or truck',
    },
  },
  {
    id: 4,
    name: 'The e-bike',
    description: 'Just mine makes it into the test',
    purchaseDate: '2022-05-30',
    cost: 1943.5,
    manufacturer: 'Reid',
    model: 'Metro',
    identification: null,
    length: null,
    weight: null,
    capacity: null,
    licensePlateNumber: null,
    insuranceCarrier: null,
    insurancePolicyNumber: null,
    insuranceContactName: null,
    insuranceContactPhoneNumber: null,
    insuranceContactEmail: null,
    equipmentType: {
      id: 3,
      name: 'Bicycle',
      description: 'Bicycle',
    },
  },
];

export const fetchAllEquipment = vi.fn().mockResolvedValue(EQUIPMENT);
export const fetchEquipment = vi
  .fn()
  .mockImplementation((id: number) => Promise.resolve(EQUIPMENT.find((d) => d.id === id)));
export const fetchEquipmentTypes = vi.fn().mockResolvedValue(EQUIPMENT_TYPES);
export const fetchTodoCollectionsForEquipment = vi.fn().mockResolvedValue([]);
export const addEquipment = vi.fn();
export const updateEquipment = vi.fn();
export const deleteEquipment = vi.fn();
export const canDeleteEquipment = vi.fn().mockResolvedValue(false);
