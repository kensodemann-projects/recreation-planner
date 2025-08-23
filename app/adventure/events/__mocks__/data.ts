import { Event, EventType, Place, PlaceType, SelectablePlace } from '@/models';
import { vi } from 'vitest';

export const PLACES: Array<SelectablePlace> = [
  {
    id: 1,
    name: 'Burnet State Park',
  },
  {
    id: 2,
    name: 'Indianapolis Motor Speedway',
  },
  {
    id: 3,
    name: 'Richard Bong State Park',
  },
  {
    id: 4,
    name: 'LaBahn Arena',
  },
];

export const EVENT_TYPES: Array<EventType> = [
  {
    id: 1,
    name: 'Camping',
    description: 'Take the RV to a destination, relax, and explore.',
  },
  {
    id: 2,
    name: 'Sporting Event',
    description: 'The primary purpose of the activity is to view a competition.',
  },
  {
    id: 3,
    name: 'Vacation',
    description: 'Visit a destination for the sole purpose of visiting the location.',
  },
];

export const EVENTS: Array<Event> = [
  {
    id: 1,
    beginDate: '2024-09-28',
    beginTime: '18:30',
    endDate: '2024-09-30',
    endTime: '22:30',
    name: "Women's Hockey Tournament",
    description: 'A three day long tournament of women playing hockey',
    place: PLACES[3],
    type: EVENT_TYPES[1],
  },
  {
    id: 2,
    beginDate: '2025-04-01',
    endDate: '2025-04-15',
    name: 'Super Camp',
    description: 'A really long-ass camping trip',
    place: PLACES[0],
    type: EVENT_TYPES[0],
  },
  {
    id: 3,
    beginDate: '2022-02-14',
    name: 'Rmoance Day',
    description: 'A full day of naked fun',
    place: PLACES[2],
    type: EVENT_TYPES[2],
  },
  {
    id: 4,
    beginDate: '2025-09-28',
    beginTime: '18:30',
    endDate: '2025-09-30',
    endTime: '22:30',
    name: "Men's Hockey Tournament",
    description: 'A three day long tournament of men playing hockey',
    place: PLACES[3],
    type: EVENT_TYPES[1],
  },
];

export const fetchPriorEvents = vi.fn().mockResolvedValue(EVENTS);
export const fetchUpcomingEvents = vi.fn().mockResolvedValue(EVENTS);
export const fetchLatestEvents = vi.fn().mockResolvedValue(EVENTS);
export const fetchEvent = vi.fn().mockImplementation((id: number, full: boolean = false) => {
  const event = EVENTS.find((x) => x.id === id);
  return Promise.resolve(event && (full ? { ...event, notes: [], todoCollections: [] } : { ...event }));
});
export const addEvent = vi.fn();
export const deleteEvent = vi.fn();
export const canDeleteEvent = vi.fn().mockResolvedValue(false);
export const fetchEventTypes = vi.fn().mockResolvedValue(EVENT_TYPES);
export const fetchPlaces = vi.fn().mockResolvedValue(PLACES);
