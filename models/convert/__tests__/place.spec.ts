import { describe, expect, it } from 'vitest';
import { convertToPlace, convertToPlaceDTO } from '../place';

describe('place convertions', () => {
  describe('to place', () => {
    it('handles a "selectable item" conversion', () => {
      expect(convertToPlace({ id: 42, name: 'Earth' })).toEqual({ id: 42, name: 'Earth' });
    });

    it('handles a "common data" conversion', () => {
      expect(convertToPlace({ id: 42, name: 'Earth', description: 'Mostly harmless' })).toEqual({
        id: 42,
        name: 'Earth',
        description: 'Mostly harmless',
      });
    });

    it('includes the address', () => {
      expect(
        convertToPlace({
          id: 42,
          name: 'Earth',
          description: 'Mostly harmless',
          address_line_1: '23125 255th St.',
          address_line_2: 'Planet #3',
          city: 'Cornell',
          state: 'WI',
          postal_code: '54732',
        }),
      ).toEqual({
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
      });
    });

    it('includes the place type', () => {
      expect(
        convertToPlace({
          id: 42,
          name: 'Earth',
          description: 'Mostly harmless',
          place_type_rid: 3,
          place_types: { name: 'Planet', description: 'Big globe thing' },
        }),
      ).toEqual({
        id: 42,
        name: 'Earth',
        description: 'Mostly harmless',
        type: {
          id: 3,
          name: 'Planet',
          description: 'Big globe thing',
        },
      });
    });

    it('converts a full place', () => {
      expect(
        convertToPlace({
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
        }),
      ).toEqual({
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
      });
    });
  });

  describe('to DTO', () => {
    it('converts a full Place for CRUD', () => {
      expect(
        convertToPlaceDTO({
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
        }),
      ).toEqual({
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
      });
    });

    it('sets unspecified or blank items to NULL', () => {
      expect(
        convertToPlaceDTO({
          id: 42,
          name: 'Earth',
          description: '',
          address: {},
          type: {
            id: 3,
            name: 'Planet',
            description: 'Big globe thing',
          },
        }),
      ).toEqual({
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
      });
    });
  });
});
