import { describe, expect, it } from 'vitest';
import { convertToPlace, convertToPlaceDTO } from '../place';

describe('place convertions', () => {
  describe('to place', () => {
    const testCases = [
      {
        name: 'handles a "selectable item" conversion',
        input: { id: 42, name: 'Earth' },
        expected: { id: 42, name: 'Earth' },
      },
      {
        name: 'handles a "common data" conversion',
        input: { id: 42, name: 'Earth', description: 'Mostly harmless' },
        expected: { id: 42, name: 'Earth', description: 'Mostly harmless' },
      },
      {
        name: 'includes the address',
        input: {
          id: 42,
          name: 'Earth',
          description: 'Mostly harmless',
          address_line_1: '23125 255th St.',
          address_line_2: 'Planet #3',
          city: 'Cornell',
          state: 'WI',
          postal_code: '54732',
        },
        expected: {
          id: 42,
          name: 'Earth',
          description: 'Mostly harmless',
          address: {
            line1: '23125 255th St.',
            line2: 'Planet #3',
            city: 'Cornell',
            state: 'WI',
            postal: '54732',
          },
        },
      },
      {
        name: 'includes the place type',
        input: {
          id: 42,
          name: 'Earth',
          description: 'Mostly harmless',
          place_type_rid: 3,
          place_types: { name: 'Planet', description: 'Big globe thing' },
        },
        expected: {
          id: 42,
          name: 'Earth',
          description: 'Mostly harmless',
          type: {
            id: 3,
            name: 'Planet',
            description: 'Big globe thing',
          },
        },
      },
      {
        name: 'converts a full place',
        input: {
          id: 42,
          name: 'Earth',
          description: 'Mostly harmless',
          address_line_1: '23125 255th St.',
          address_line_2: 'Planet #3',
          city: 'Cornell',
          state: 'WI',
          postal_code: '54732',
          place_type_rid: 3,
          place_types: { name: 'Planet', description: 'Big globe thing' },
          phone_number: '(262) 339-9943',
          website: 'https://foo.bar',
        },
        expected: {
          id: 42,
          name: 'Earth',
          description: 'Mostly harmless',
          address: {
            line1: '23125 255th St.',
            line2: 'Planet #3',
            city: 'Cornell',
            state: 'WI',
            postal: '54732',
          },
          type: {
            id: 3,
            name: 'Planet',
            description: 'Big globe thing',
          },
          phoneNumber: '(262) 339-9943',
          website: 'https://foo.bar',
        },
      },
    ];

    it.each(testCases)('$name', ({ input, expected }) => expect(convertToPlace(input)).toEqual(expected));
  });

  describe('to DTO', () => {
    const testCases = [
      {
        name: 'converts a full Place for CRUD',
        input: {
          id: 42,
          name: 'Earth',
          description: 'Mostly harmless',
          address: {
            line1: '23125 255th St.',
            line2: 'Planet #3',
            city: 'Cornell',
            state: 'WI',
            postal: '54732',
          },
          type: {
            id: 3,
            name: 'Planet',
            description: 'Big globe thing',
          },
          phoneNumber: '(262) 339-9943',
          website: 'https://foo.bar',
        },
        expected: {
          name: 'Earth',
          description: 'Mostly harmless',
          address_line_1: '23125 255th St.',
          address_line_2: 'Planet #3',
          city: 'Cornell',
          state: 'WI',
          postal_code: '54732',
          place_type_rid: 3,
          phone_number: '(262) 339-9943',
          website: 'https://foo.bar',
        },
      },
      {
        name: 'sets unspecified or blank items to NULL',
        input: {
          id: 42,
          name: 'Earth',
          description: '',
          address: {},
          type: {
            id: 3,
            name: 'Planet',
            description: 'Big globe thing',
          },
        },
        expected: {
          name: 'Earth',
          description: null,
          address_line_1: null,
          address_line_2: null,
          city: null,
          state: null,
          postal_code: null,
          place_type_rid: 3,
          phone_number: null,
          website: null,
        },
      },
    ];

    it.each(testCases)('$name', ({ input, expected }) => expect(convertToPlaceDTO(input)).toEqual(expected));
  });
});
