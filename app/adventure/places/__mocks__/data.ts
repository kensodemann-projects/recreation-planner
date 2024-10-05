import { Place } from '@/models';
import { vi } from 'vitest';

const DUMMY_DATA: Array<Place> = [
  {
    id: '1',
    name: 'Burnet State Park',
    address: {
      line1: '23125 255th St.',
      city: 'Cornell',
      state: 'WI',
      postal: '54732',
    },
    typeName: 'State Park',
    phoneNumber: '(715) 239-6888',
  },
  {
    id: '2',
    name: 'Indianapolis Motor Speedway',
    address: {
      line1: '4790 West 16th Street',
      city: 'Speedway',
      state: 'IN',
    },
    typeName: 'Race Track',
  },
  {
    id: '3',
    name: 'Richard Bong State Park',
    address: {
      line1: '26313 Burlington Rd.',
      city: 'Kansasville',
      state: 'WI',
      postal: '53139',
    },
    typeName: 'State Park',
    phoneNumber: '(262) 878-5600',
  },
  {
    id: '4',
    name: 'LaBahn Arena',
    address: {
      line1: '105 East Campus Mall',
      city: 'Madison',
      state: 'WI',
      postal: '53715',
    },
    typeName: 'Sports Arena',
  },
];

export const fetchPlaces = vi.fn().mockResolvedValue(DUMMY_DATA);
