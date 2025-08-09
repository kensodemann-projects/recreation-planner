import { Event, EventType, Note, Place, PlaceType, SelectablePlace } from '@/models';
import { vi } from 'vitest';

export const NOTES: Array<Note> = [
  {
    id: 1,
    name: 'The potable water was broken',
    description: "I don't know if that is how it just is or if it normally works, but that was certainly an issue.",
    placeRid: 14,
  },
  {
    id: 2,
    name: 'Beautiful Site',
    placeRid: 14,
  },
  {
    id: 3,
    name: 'Need to check the AGS',
    description: 'Lead 2 should have something in it. I need to check with the dealer who are checking on it.',
    equipmentRid: 1,
  },
  {
    id: 4,
    name: 'Too hot',
    description: 'Usually it is freezing at this race. This year we roasted.',
    eventRid: 4,
  },
];

export const fetchNote = vi.fn().mockImplementation((id: number) => Promise.resolve(NOTES.find((x) => x.id === id)));
export const addNote = vi.fn();
export const deleteNote = vi.fn();
export const canDeleteNote = vi.fn().mockResolvedValue(false);
export const updateNote = vi.fn();
