import { describe, expect, it } from 'vitest';
import { convertToEventType, convertToEventTypeDTO } from '../event-type';

describe('event type converters', () => {
  describe('to EventType', () => {
    const testCases = [
      {
        name: 'converts a full object',
        value: { id: 42, name: 'Do the needful', description: 'The needful is the thing that is needed fully.' },
        expected: { id: 42, name: 'Do the needful', description: 'The needful is the thing that is needed fully.' },
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) => expect(convertToEventType(value)).toEqual(expected));
  });

  describe('to EventType DTO', () => {
    const testCases = [
      {
        name: 'converts a full object',
        value: { id: 42, name: 'Do the needful', description: 'The needful is the thing that is needed fully.' },
        expected: { id: 42, name: 'Do the needful', description: 'The needful is the thing that is needed fully.' },
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) => expect(convertToEventTypeDTO(value)).toEqual(expected));
  });
});
