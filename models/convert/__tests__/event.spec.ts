import { describe, expect, it } from 'vitest';
import { convertToEvent, convertToEventDTO } from '../event';

describe('event convertions', () => {
  describe('to event', () => {
    const testCases = [
      {
        name: 'handles a "common data" conversion',
        value: {
          id: 42,
          name: 'Build a by-pass',
          description: 'The Vogons should destroy the Earth to do this.',
        },
        expected: {
          id: 42,
          name: 'Build a by-pass',
          description: 'The Vogons should destroy the Earth to do this.',
        },
      },
      {
        name: 'converts a full event',
        value: {
          id: 42,
          name: 'Build a by-pass',
          description: 'The Vogons should destroy the Earth to do this.',
          begin_date: '2017-07-04',
          begin_time: '13:43',
          end_date: '2017-07-05',
          end_time: '08:42',
          place_rid: 3,
          places: {
            id: 3,
            name: 'Earth',
            description: 'Third rock from Sol',
            address_line_1: 'Planet #3',
            state: 'Solar System',
            website: 'https://solsys.gov',
          },
          event_type_rid: 2,
          event_types: { id: 2, name: 'Demolition', description: 'Death and destrutction' },
          notes: [
            {
              id: 16,
              name: 'Test note 1',
              description: 'This is a test note.',
              event_rid: 42,
              equipment_rid: null,
              place_rid: null,
            },
            {
              id: 18,
              name: 'Test note 2',
              description: null,
              event_rid: 42,
              equipment_rid: null,
              place_rid: null,
            },
          ],
          todo_collections: [
            {
              id: 1,
              name: 'Stuff I need to do',
              description: 'This is a thing, and I need to do things that are stuff',
              due_date: '2025-05-23',
              is_complete: false,
              event_rid: 42,
              equipment_rid: null,
              todo_items: [
                {
                  id: 42,
                  name: 'Do the needful',
                  is_complete: false,
                  todo_collection_rid: 1,
                },
                {
                  id: 73,
                  name: 'Bite the unbitten',
                  is_complete: true,
                  todo_collection_rid: 1,
                },
                {
                  id: 314159,
                  name: 'Eat the pi',
                  is_complete: false,
                  todo_collection_rid: 1,
                },
              ],
            },
          ],
        },
        expected: {
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
              line2: null,
              city: null,
              state: 'Solar System',
              postal: null,
            },
            website: 'https://solsys.gov',
          },
          type: {
            id: 2,
            name: 'Demolition',
            description: 'Death and destrutction',
          },
          notes: [
            {
              id: 16,
              name: 'Test note 1',
              description: 'This is a test note.',
              eventRid: 42,
              equipmentRid: null,
              placeRid: null,
            },
            {
              id: 18,
              name: 'Test note 2',
              description: null,
              eventRid: 42,
              equipmentRid: null,
              placeRid: null,
            },
          ],
          todoCollections: [
            {
              id: 1,
              name: 'Stuff I need to do',
              description: 'This is a thing, and I need to do things that are stuff',
              dueDate: '2025-05-23',
              isComplete: false,
              eventRid: 42,
              equipmentRid: null,
              todoItems: [
                {
                  id: 42,
                  name: 'Do the needful',
                  isComplete: false,
                  todoCollectionRid: 1,
                },
                {
                  id: 73,
                  name: 'Bite the unbitten',
                  isComplete: true,
                  todoCollectionRid: 1,
                },
                {
                  id: 314159,
                  name: 'Eat the pi',
                  isComplete: false,
                  todoCollectionRid: 1,
                },
              ],
            },
          ],
        },
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) => expect(convertToEvent(value)).toEqual(expected));
  });

  describe('to DTO', () => {
    const testCases = [
      {
        name: 'converts a full event for CRUD',
        value: {
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
              line2: null,
              city: null,
              state: 'Solar System',
              postal: null,
            },
            website: 'https://solsys.gov',
          },
          type: {
            id: 2,
            name: 'Demolition',
            description: 'Death and destrutction',
          },
        },
        expected: {
          name: 'Build a by-pass',
          description: 'The Vogons should destroy the Earth to do this.',
          begin_date: '2017-07-04',
          begin_time: '13:43',
          end_date: '2017-07-05',
          end_time: '08:42',
          place_rid: 3,
          event_type_rid: 2,
        },
      },
      {
        name: 'trims the strings',
        value: {
          id: 42,
          name: '  Build a by-pass ',
          description: ' The Vogons should destroy the Earth to do this. ',
          beginDate: '2017-07-04 ',
          beginTime: ' 13:43  ',
          endDate: ' 2017-07-05      ',
          endTime: '  08:42 ',
          place: {
            id: 3,
            name: 'Earth',
            description: 'Third rock from Sol',
            address: {
              line1: 'Planet #3',
              line2: null,
              city: null,
              state: 'Solar System',
              postal: null,
            },
            website: 'https://solsys.gov',
          },
          type: {
            id: 2,
            name: 'Demolition',
            description: 'Death and destrutction',
          },
        },
        expected: {
          name: 'Build a by-pass',
          description: 'The Vogons should destroy the Earth to do this.',
          begin_date: '2017-07-04',
          begin_time: '13:43',
          end_date: '2017-07-05',
          end_time: '08:42',
          place_rid: 3,
          event_type_rid: 2,
        },
      },
      {
        name: 'sets unspecified values to null',
        value: {
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
              line2: null,
              city: null,
              state: 'Solar System',
              postal: null,
            },
            website: 'https://solsys.gov',
          },
          type: {
            id: 2,
            name: 'Demolition',
            description: 'Death and destrutction',
          },
        },
        expected: {
          name: 'Build a by-pass',
          description: null,
          begin_date: '2017-07-04',
          begin_time: null,
          end_date: null,
          end_time: null,
          place_rid: 3,
          event_type_rid: 2,
        },
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) => expect(convertToEventDTO(value)).toEqual(expected));
  });
});
