import { Equipment, EquipmentEvent, EquipmentEventType, EquipmentType, Note, UsageUnits } from '@/models';
import { vi } from 'vitest';

export const NOTES: Note[] = [
  {
    id: 1,
    name: 'The Brewers are hot',
    description: 'A least 13 in a row, working on 14.',
    eventRid: null,
    equipmentRid: null,
    placeRid: 2,
  },
  {
    id: 2,
    name: 'Gimme pop sugar',
    description: 'A car or truck',
    eventRid: null,
    equipmentRid: null,
    placeRid: 2,
  },
  {
    id: 3,
    name: 'Bicycle',
    description: 'Bicycle',
    eventRid: 3,
    equipmentRid: null,
    placeRid: null,
  },
  {
    id: 4,
    name: 'Furnishing',
    description: 'Tables, chairs, outdoor rugs, etc.',
    eventRid: null,
    equipmentRid: 2,
    placeRid: null,
  },
  {
    id: 5,
    name: 'Shelter',
    description: 'Popups, clams, etc.',
    eventRid: null,
    equipmentRid: 1,
    placeRid: null,
  },
  {
    id: 6,
    name: 'Accessories',
    description: 'Assorted items needed for camping such as grills.',
    eventRid: 9,
    equipmentRid: null,
    placeRid: null,
  },
];

export const fetchNote = vi.fn().mockImplementation((id: number) => Promise.resolve(NOTES.find((x) => x.id === id)));
export const addNote = vi.fn();
export const updateNote = vi.fn();
export const deleteNote = vi.fn();
export const canDeleteNote = vi.fn().mockResolvedValue(false);
