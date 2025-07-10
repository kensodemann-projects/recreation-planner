import { describe, expect, it } from 'vitest';
import { convertToEquipmentEventType, convertToEquipmentEventTypeDTO } from '../equipment-event-type';

describe('equipment event type converters', () => {
  describe('to EquipmentEventType', () => {
    const testCases = [
      {
        name: 'converts a full object',
        value: { id: 42, name: 'Do the needful', description: 'The needful is the thing that is needed fully.' },
        expected: { id: 42, name: 'Do the needful', description: 'The needful is the thing that is needed fully.' },
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) => expect(convertToEquipmentEventType(value)).toEqual(expected));
  });

  describe('to EquipmentEventType DTO', () => {
    const testCases = [
      {
        name: 'converts a full object',
        value: { id: 42, name: 'Do the needful', description: 'The needful is the thing that is needed fully.' },
        expected: { id: 42, name: 'Do the needful', description: 'The needful is the thing that is needed fully.' },
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) =>
      expect(convertToEquipmentEventTypeDTO(value)).toEqual(expected),
    );
  });
});
