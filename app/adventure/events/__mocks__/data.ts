import { EventType, Place, PlaceType } from '@/models';
import { vi } from 'vitest';

const PLACE_TYPES: Array<PlaceType> = [
  {
    id: 1,
    name: 'State Park',
    description: 'A state owned property for camping and recreation.',
  },
  {
    id: 2,
    name: 'Race Track',
    description: 'A place where it is OK to drive really fast.',
  },
  {
    id: 3,
    name: 'Sports Arena',
    description: 'Go sports!!',
  },
  {
    id: 4,
    name: 'Hotel',
    description: 'A place to lodge for the night.',
  },
];

const PLACES: Array<Place> = [
  {
    id: 1,
    name: 'Burnet State Park',
    address: {
      line1: '23125 255th St.',
      city: 'Cornell',
      state: 'WI',
      postal: '54732',
    },
    type: PLACE_TYPES[0],
    phoneNumber: '(715) 239-6888',
  },
  {
    id: 2,
    name: 'Indianapolis Motor Speedway',
    address: {
      line1: '4790 West 16th Street',
      city: 'Speedway',
      state: 'IN',
    },
    type: PLACE_TYPES[1],
  },
  {
    id: 3,
    name: 'Richard Bong State Park',
    address: {
      line1: '26313 Burlington Rd.',
      city: 'Kansasville',
      state: 'WI',
      postal: '53139',
    },
    type: PLACE_TYPES[0],
    phoneNumber: '(262) 878-5600',
  },
  {
    id: 4,
    name: 'LaBahn Arena',
    address: {
      line1: '105 East Campus Mall',
      city: 'Madison',
      state: 'WI',
      postal: '53715',
    },
    type: PLACE_TYPES[2],
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

export const fetchEventTypes = vi.fn().mockResolvedValue(EVENT_TYPES);
export const fetchPlaces = vi.fn().mockResolvedValue(PLACES);
