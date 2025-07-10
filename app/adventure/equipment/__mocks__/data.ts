import { Equipment, EquipmentEvent, EquipmentEventType, EquipmentType, UsageUnits } from '@/models';
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

// Note: Due to logic within the application, the test equipment event types must match the equipment event types
//       that are defined within the database.
export const EQUIPMENT_EVENT_TYPES: EquipmentEventType[] = [
  { id: 1, name: 'Mileage/Usage Reading', description: 'Periodic reading of the odometer or usage timer.' },
  {
    id: 2,
    name: 'Periodic Maintenance',
    description: 'Periodic change of oil and other fluids. May also include related periodic maintenance.',
  },
  { id: 3, name: 'Repair', description: 'Unscheduled repair due to damage or breakdown.' },
  { id: 4, name: 'Improvement / Modification', description: 'Modifications made to enhance the equipment' },
  {
    id: 5,
    name: 'Condition Report',
    description: 'Inspect the equipment and provide a report of its current condition based on this assessment.',
  },
];

export const USAGE_UNITS: UsageUnits[] = [
  { id: 1, name: 'Miles' },
  { id: 2, name: 'Hours' },
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

export const EQUIPMENT_EVENTS: EquipmentEvent[] = [
  {
    id: 1,
    name: 'Spring Inspection',
    description: 'Generally in good condition.',
    equipmentRid: 3,
    date: '2025-05-20',
    usage: null,
    cost: null,
    equipmentEventType: EQUIPMENT_EVENT_TYPES[4],
  },
  {
    id: 2,
    name: '2025 Fall Oil Change',
    equipmentRid: 3,
    date: '2025-08-15',
    usage: 12834.3,
    cost: 123.43,
    equipmentEventType: EQUIPMENT_EVENT_TYPES[1],
    usageUnits: USAGE_UNITS[0],
  },
  {
    id: 3,
    name: 'Spring Inspection',
    description: 'The brakes squeak a bit, but it does not seem to be a problem overall.',
    equipmentRid: 4,
    date: '2025-03-17',
    usage: 12.7,
    cost: null,
    equipmentEventType: EQUIPMENT_EVENT_TYPES[1],
    usageUnits: USAGE_UNITS[1],
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
export const fetchEquipmentEvents = vi
  .fn()
  .mockImplementation((equipmentRid: number) =>
    Promise.resolve(EQUIPMENT_EVENTS.filter((d) => d.equipmentRid === equipmentRid)),
  );
export const fetchEquipmentEvent = vi
  .fn()
  .mockImplementation((id: number) => Promise.resolve(EQUIPMENT_EVENTS.find((d) => d.id === id)));
export const addEquipmentEvent = vi.fn();
export const updateEquipmentEvent = vi.fn();
export const deleteEquipmentEvent = vi.fn();
export const canDeleteEquipmentEvent = vi.fn().mockResolvedValue(false);
export const fetchEquipmentEventTypes = vi.fn().mockResolvedValue(EQUIPMENT_EVENT_TYPES);
export const fetchUsageUnits = vi.fn().mockResolvedValue(USAGE_UNITS);
