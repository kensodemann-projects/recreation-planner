import { describe, expect, it } from 'vitest';
import { convertToEvent, convertToEventDTO } from '../event';

describe('event convertions', () => {
  describe('to event', () => {
    it('handles a "common data" conversion', () => {
      expect(
        convertToEvent({
          id: 42,
          name: 'Build a by-pass',
          description: 'The Vogons should destroy the Earth to do this.',
        }),
      ).toEqual({
        id: 42,
        name: 'Build a by-pass',
        description: 'The Vogons should destroy the Earth to do this.',
      });
    });

    it('converts a full event', () => {
      expect(
        convertToEvent({
          id: 42,
          name: 'Build a by-pass',
          description: 'The Vogons should destroy the Earth to do this.',
          begin_date: '2017-07-04',
          begin_time: '13:43',
          end_date: '2017-07-05',
          end_time: '08:42',
          place_rid: 3,
          places: {
            name: 'Earth',
            description: 'Third rock from Sol',
            address_line_1: 'Planet #3',
            state: 'Solar System',
            website: 'https://solsys.gov',
          },
          event_type_rid: 2,
          event_types: { name: 'Demolition', description: 'Death and destrutction' },
        }),
      ).toEqual({
        id: 42,
        name: 'Build a by-pass',
        description: 'The Vogons should destroy the Earth to do this.',
        beginDate: '2017-07-04',
        beginTime: '13:43',
        endDate: '2017-07-05',
        endTime: '08:42',
        place: {
          id: 3,
          name: 'Earth',
          description: 'Third rock from Sol',
          address: {
            line1: 'Planet #3',
            state: 'Solar System',
          },
          website: 'https://solsys.gov',
        },
        type: {
          id: 2,
          name: 'Demolition',
          description: 'Death and destrutction',
        },
      });
    });
  });

  describe('to DTO', () => {
    it('converts a full Event for CRUD', () => {
      expect(
        convertToEventDTO({
          id: 42,
          name: 'Build a by-pass',
          description: 'The Vogons should destroy the Earth to do this.',
          beginDate: '2017-07-04',
          beginTime: '13:43',
          endDate: '2017-07-05',
          endTime: '08:42',
          place: {
            id: 3,
            name: 'Earth',
            description: 'Third rock from Sol',
            address: {
              line1: 'Planet #3',
              state: 'Solar System',
            },
            website: 'https://solsys.gov',
          },
          type: {
            id: 2,
            name: 'Demolition',
            description: 'Death and destrutction',
          },
        }),
      ).toEqual({
        name: 'Build a by-pass',
        description: 'The Vogons should destroy the Earth to do this.',
        begin_date: '2017-07-04',
        begin_time: '13:43',
        end_date: '2017-07-05',
        end_time: '08:42',
        place_rid: 3,
        event_type_rid: 2,
      });
    });

    it('sets unspecified values to null', () => {
      expect(
        convertToEventDTO({
          id: 42,
          name: 'Build a by-pass',
          beginDate: '2017-07-04',
          endDate: '',
          place: {
            id: 3,
            name: 'Earth',
            description: 'Third rock from Sol',
            address: {
              line1: 'Planet #3',
              state: 'Solar System',
            },
            website: 'https://solsys.gov',
          },
          type: {
            id: 2,
            name: 'Demolition',
            description: 'Death and destrutction',
          },
        }),
      ).toEqual({
        name: 'Build a by-pass',
        description: null,
        begin_date: '2017-07-04',
        begin_time: null,
        end_date: null,
        end_time: null,
        place_rid: 3,
        event_type_rid: 2,
      });
    });
  });
});
