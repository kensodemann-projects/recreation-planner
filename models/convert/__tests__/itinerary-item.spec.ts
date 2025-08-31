import { ItineraryItem, ItineraryItemDTO } from '@/models/itinerary-item';
import { describe, expect, it } from 'vitest';
import { convertToItineraryItem, convertToItineraryItemDTO } from '../itinerary-item';

describe('itinerary item converters', () => {
  describe('to Itinerary Item', () => {
    const testCases: { name: string; value: ItineraryItemDTO; expected: ItineraryItem }[] = [
      {
        name: 'converts an event itinerary item',
        value: {
          id: 42,
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          date: '2025-03-18',
          time: '08:00',
          event_rid: 321,
        },
        expected: {
          id: 42,
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          date: '2025-03-18',
          time: '08:00',
          eventRid: 321,
        },
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) => expect(convertToItineraryItem(value)).toEqual(expected));
  });

  describe('to Itinerary Item DTO', () => {
    const testCases: { name: string; value: ItineraryItem; expected: ItineraryItemDTO }[] = [
      {
        name: 'converts an event itinerary item for update',
        value: {
          id: 42,
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          eventRid: 314,
          date: '2025-03-18',
          time: '08:00',
        },
        expected: {
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          event_rid: 314,
          date: '2025-03-18',
          time: '08:00',
        },
      },
      {
        name: 'converts an event itinerary item for create',
        value: {
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          eventRid: 314,
          date: '2025-03-18',
          time: '08:00',
        },
        expected: {
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          event_rid: 314,
          date: '2025-03-18',
          time: '08:00',
        },
      },
      {
        name: 'converts a empty description to null',
        value: {
          id: 42,
          name: 'Do the needful',
          description: '     ',
          eventRid: 314,
          date: '2025-03-18',
          time: '08:00',
        },
        expected: {
          name: 'Do the needful',
          description: null,
          event_rid: 314,
          date: '2025-03-18',
          time: '08:00',
        },
      },
      {
        name: 'trims the string fields',
        value: {
          id: 42,
          name: ' Do the needful  ',
          description: '   The needful was not all that full of need.     ',
          eventRid: 314,
          date: '  2025-03-18 ',
          time: ' 08:00    ',
        },
        expected: {
          name: 'Do the needful',
          description: 'The needful was not all that full of need.',
          event_rid: 314,
          date: '2025-03-18',
          time: '08:00',
        },
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) => expect(convertToItineraryItemDTO(value)).toEqual(expected));
  });
});
