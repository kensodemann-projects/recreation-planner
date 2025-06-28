import { Equipment } from '@/models';
import { vi } from 'vitest';

const EQUIPMENT: Array<Equipment> = [
  {
    id: 1,
    name: 'Burnet State Park',
    purchaseDate: '2015-03-17',
    cost: 42584.34,
  },
  {
    id: 2,
    name: 'Indianapolis Motor Speedway',
    purchaseDate: '2015-03-17',
    cost: 42584.34,
  },
  {
    id: 3,
    name: 'Richard Bong State Park',
    purchaseDate: '2015-03-17',
    cost: 42584.34,
  },
  {
    id: 4,
    name: 'Ford Maverick',
    purchaseDate: '2015-03-17',
    cost: 42584.34,
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
