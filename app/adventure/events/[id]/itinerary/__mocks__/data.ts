import { ItineraryItem } from '@/models';
import { vi } from 'vitest';

export const ITINERARY_ITEMS: ItineraryItem[] = [
  {
    id: 1,
    name: 'Set up the campsite',
    description: 'I will concentrate on the outside, Lisa the inside. Then whoever is done will help the other.',
    date: '2025-07-03',
    time: '15:00',
    eventRid: 14,
  },
  {
    id: 2,
    name: 'Dinner',
    description: 'Burgers and tots',
    date: '2025-07-03',
    time: '15:00',
    eventRid: 14,
  },
  {
    id: 3,
    name: 'Bicycle',
    description: 'Bicycle around the joint',
    date: '2025-08-01',
    time: '10:00',
    eventRid: 4,
  },
  {
    id: 4,
    name: 'Furnishing',
    description: 'Tables, chairs, outdoor rugs, etc. need to be set up',
    eventRid: 4,
    date: '2025-08-02',
    time: '06:00',
  },
  {
    id: 5,
    name: 'Shelter in place',
    description: 'The end of the world has been scheduled by someone else.',
    eventRid: 14,
    date: '2025-07-04',
    time: '18:00',
  },
  {
    id: 6,
    name: 'Accessorize',
    description: null,
    eventRid: 9,
    date: '2025-06-17',
    time: '23:00',
  },
];

export const fetchItineraryItem = vi
  .fn()
  .mockImplementation((id: number) => Promise.resolve(ITINERARY_ITEMS.find((x) => x.id === id)));
export const addItineraryItem = vi.fn();
export const updateItineraryItem = vi.fn();
export const deleteItineraryItem = vi.fn();
export const canDeleteItineraryItem = vi.fn().mockResolvedValue(false);
