import { describe, expect, it } from 'vitest';
import { convertToUsageUnits } from '../usage-units';

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
});
