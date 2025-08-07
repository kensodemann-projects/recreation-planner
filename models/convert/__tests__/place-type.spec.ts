import { describe, expect, it } from 'vitest';
import { convertToPlaceType, convertToPlaceTypeDTO } from '../place-type';

describe('Place type converters', () => {
  describe('to PlaceType', () => {
    const testCases = [
      {
        name: 'converts a full object',
        value: { id: 42, name: 'Do the needful', description: 'The needful is the thing that is needed fully.' },
        expected: { id: 42, name: 'Do the needful', description: 'The needful is the thing that is needed fully.' },
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) => expect(convertToPlaceType(value)).toEqual(expected));
  });

  describe('to PlaceType DTO', () => {
    const testCases = [
      {
        name: 'converts a full object',
        value: { id: 42, name: 'Do the needful', description: 'The needful is the thing that is needed fully.' },
        expected: { id: 42, name: 'Do the needful', description: 'The needful is the thing that is needed fully.' },
      },
      {
        name: 'trims the strings',
        value: { id: 42, name: ' Do the needful   ', description: ' The needful is the thing that is needed fully. ' },
        expected: { id: 42, name: 'Do the needful', description: 'The needful is the thing that is needed fully.' },
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) => expect(convertToPlaceTypeDTO(value)).toEqual(expected));
  });
});
