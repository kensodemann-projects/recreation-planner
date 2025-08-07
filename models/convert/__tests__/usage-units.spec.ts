import { describe, expect, it } from 'vitest';
import { convertToUsageUnits, convertToUsageUnitsDTO } from '../usage-units';

describe('Usage Units converters', () => {
  describe('to UsageUnits', () => {
    const testCases = [
      {
        name: 'converts a full object',
        value: { id: 42, name: 'Do the needful' },
        expected: { id: 42, name: 'Do the needful' },
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) => expect(convertToUsageUnits(value)).toEqual(expected));
  });

  describe('to UsageUnits DTO', () => {
    const testCases = [
      {
        name: 'converts a full object',
        value: { id: 42, name: 'Do the needful' },
        expected: { id: 42, name: 'Do the needful' },
      },
      {
        name: 'trims the strings',
        value: { id: 42, name: ' Do the needful ' },
        expected: { id: 42, name: 'Do the needful' },
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) => expect(convertToUsageUnitsDTO(value)).toEqual(expected));
  });
});
