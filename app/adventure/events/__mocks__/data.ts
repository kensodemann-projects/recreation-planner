import { Event, EventType, Place, PlaceType, SelectablePlace } from '@/models';
import { vi } from 'vitest';

const PLACES: Array<SelectablePlace> = [
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

const EVENT_TYPES: Array<EventType> = [
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

const EVENTS: Array<Event> = [
  {
    id: 314,
    beginDate: '2024-09-28',
    beginTime: '18:30',
    endDate: '2024-09-30',
    endTime: '22:30',
    name: "Women's Hockey Tournament",
    description: 'A three day long tournament of women playing hockey',
    place: PLACES[3],
    type: EVENT_TYPES[1],
  },
];

export const fetchEvents = vi.fn().mockResolvedValue(EVENTS);
export const fetchUpcomingEvents = vi.fn().mockResolvedValue(EVENTS);
export const fetchEvent = vi.fn().mockResolvedValue(EVENTS[0]);
export const addEvent = vi.fn();
export const deleteEvent = vi.fn();
export const canDeleteEvent = vi.fn().mockResolvedValue(false);
export const fetchEventTypes = vi.fn().mockResolvedValue(EVENT_TYPES);
export const fetchPlaces = vi.fn().mockResolvedValue(PLACES);
