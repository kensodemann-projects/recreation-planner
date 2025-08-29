import { describe, expect, it } from 'vitest';
import { convertToPlace, convertToPlaceDTO } from '../place';
import { Place, PlaceDTO } from '@/models/place';

describe('place convertions', () => {
  describe('to place', () => {
    const testCases: {
      name: string;
      input: PlaceDTO;
      expected: Place;
    }[] = [
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
          phone_number: null,
          website: null,
          place_type_rid: 3,
          place_types: { id: 3, name: 'Planet', description: 'Big globe thing' },
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
          phoneNumber: null,
          website: null,
          type: {
            id: 3,
            name: 'Planet',
            description: 'Big globe thing',
          },
        },
      },
      {
        name: 'handles having no address data',
        input: {
          id: 42,
          name: 'Earth',
          description: 'Mostly harmless',
          address_line_1: null,
          address_line_2: null,
          city: null,
          state: null,
          postal_code: null,
          phone_number: null,
          website: null,
          place_type_rid: 3,
          place_types: { id: 3, name: 'Planet', description: 'Big globe thing' },
        },
        expected: {
          id: 42,
          name: 'Earth',
          description: 'Mostly harmless',
          phoneNumber: null,
          website: null,
          address: {
            line1: null,
            line2: null,
            city: null,
            state: null,
            postal: null,
          },
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
          place_types: { id: 3, name: 'Planet', description: 'Big globe thing' },
          phone_number: '(262) 339-9943',
          website: 'https://foo.bar',
          notes: [
            {
              id: 84,
              name: 'Mostly harmless, but only mostly',
              description: 'They are very good at harming themselves if you ask me.',
              equipment_rid: null,
              event_rid: null,
              place_rid: 42,
            },
            {
              id: 101,
              name: 'The end',
              description: 'It is the end of the world as we know it, and I feel fine.',
              equipment_rid: null,
              event_rid: null,
              place_rid: 42,
            },
            {
              id: 84,
              name: 'Pointless',
              description: 'There is really no point in saving this place, though the fjords are very nice.',
              equipment_rid: null,
              event_rid: null,
              place_rid: 42,
            },
          ],
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
          notes: [
            {
              id: 84,
              name: 'Mostly harmless, but only mostly',
              description: 'They are very good at harming themselves if you ask me.',
              equipmentRid: null,
              eventRid: null,
              placeRid: 42,
            },
            {
              id: 101,
              name: 'The end',
              description: 'It is the end of the world as we know it, and I feel fine.',
              equipmentRid: null,
              eventRid: null,
              placeRid: 42,
            },
            {
              id: 84,
              name: 'Pointless',
              description: 'There is really no point in saving this place, though the fjords are very nice.',
              equipmentRid: null,
              eventRid: null,
              placeRid: 42,
            },
          ],
        },
      },
    ];

    it.each(testCases)('$name', ({ input, expected }) => expect(convertToPlace(input)).toEqual(expected));
  });

  describe('to DTO', () => {
    const testCases: { name: string; input: Place; expected: PlaceDTO }[] = [
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
        name: 'times the strings',
        input: {
          id: 42,
          name: '    Earth ',
          description: ' Mostly harmless ',
          address: {
            line1: '   23125 255th St. ',
            line2: ' Planet #3 ',
            city: ' Cornell   ',
            state: ' WI     ',
            postal: '  54732 ',
          },
          type: {
            id: 3,
            name: 'Planet',
            description: 'Big globe thing',
          },
          phoneNumber: '    (262) 339-9943 ',
          website: ' https://foo.bar ',
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
        name: 'sets blank items to NULL',
        input: {
          id: 42,
          name: 'Earth',
          description: '',
          phoneNumber: '',
          website: '',
          address: {
            line1: '',
            line2: '',
            city: '',
            state: '',
            postal: '',
          },
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
