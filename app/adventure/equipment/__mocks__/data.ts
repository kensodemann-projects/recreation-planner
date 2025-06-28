import { Equipment } from '@/models';
import { vi } from 'vitest';

export const EQUIPMENT: Array<Equipment> = [
  {
    id: 1,
    name: 'Ford Pinto',
    description: 'It blows up if you touch it, so be careful',
    purchaseDate: '1977-03-17',
    cost: 3024.34,
  },
  {
    id: 2,
    name: 'The bare minimum',
    purchaseDate: null,
    cost: null,
  },
  {
    id: 3,
    name: 'Fork Maverick',
    purchaseDate: '2014-11-27',
    cost: 24584.34,
  },
  {
    id: 4,
    name: 'The e-bike',
    description: 'Just mine makes it into the test',
    purchaseDate: '2022-05-30',
    cost: 1943.5,
  },
];

export const fetchAllEquipment = vi.fn().mockResolvedValue(EQUIPMENT);
export const fetchEquipment = vi
  .fn()
  .mockImplementation((id: number) => Promise.resolve(EQUIPMENT.find((d) => d.id === id)));
export const fetchTodoCollectionsForEquipment = vi.fn().mockResolvedValue([]);
export const addEquipment = vi.fn();
export const updateEquipment = vi.fn();
export const deleteEquipment = vi.fn();
export const canDeleteEquipment = vi.fn().mockResolvedValue(false);
