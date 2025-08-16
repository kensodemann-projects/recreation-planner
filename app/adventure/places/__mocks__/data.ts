import { Place, PlaceType } from '@/models';
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

export const PLACES: Array<Place> = [
  {
    id: 1,
    name: 'Burnet State Park',
    address: {
      line1: '23125 255th St.',
      line2: null,
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
      line2: null,
      city: 'Speedway',
      state: 'IN',
      postal: null,
    },
    type: PLACE_TYPES[1],
  },
  {
    id: 3,
    name: 'Richard Bong State Park',
    address: {
      line1: '26313 Burlington Rd.',
      line2: null,
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
      line2: null,
      city: 'Madison',
      state: 'WI',
      postal: '53715',
    },
    type: PLACE_TYPES[2],
  },
];

export const fetchPlaces = vi.fn().mockResolvedValue(PLACES);
export const fetchPlace = vi.fn().mockImplementation((id: number, full?: boolean) => {
  const place = PLACES.find((d) => d.id === id);
  return Promise.resolve(place && (full ? { ...place, notes: [] } : { ...place }));
});
export const addPlace = vi.fn();
export const updatePlace = vi.fn();
export const deletePlace = vi.fn();
export const canDeletePlace = vi.fn().mockResolvedValue(false);

export const fetchPlaceTypes = vi.fn().mockResolvedValue(PLACE_TYPES);
