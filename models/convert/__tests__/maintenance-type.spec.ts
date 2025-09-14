import { describe, expect, it } from 'vitest';
import { convertToMaintenanceType } from '../maintenance-type';

describe('maintenance type converters', () => {
  describe('to MaintenanceType', () => {
    const testCases = [
      {
        name: 'converts a full object',
        value: { id: 42, name: 'Do the needful', description: 'The needful is the thing that is needed fully.' },
        expected: { id: 42, name: 'Do the needful', description: 'The needful is the thing that is needed fully.' },
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) => expect(convertToMaintenanceType(value)).toEqual(expected));
  });
});
