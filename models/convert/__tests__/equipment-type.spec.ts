import { describe, expect, it } from 'vitest';
import { convertToEquipmentType, convertToEquipmentTypeDTO } from '../equipment-type';

describe('equipment type converters', () => {
  describe('to EquipmentType', () => {
    const testCases = [
      {
        name: 'converts a full object',
        value: { id: 42, name: 'Do the needful', description: 'The needful is the thing that is needed fully.' },
        expected: { id: 42, name: 'Do the needful', description: 'The needful is the thing that is needed fully.' },
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) => expect(convertToEquipmentType(value)).toEqual(expected));
  });

  describe('to EquipmentType DTO', () => {
    const testCases = [
      {
        name: 'converts a full object',
        value: { id: 42, name: 'Do the needful', description: 'The needful is the thing that is needed fully.' },
        expected: { id: 42, name: 'Do the needful', description: 'The needful is the thing that is needed fully.' },
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) => expect(convertToEquipmentTypeDTO(value)).toEqual(expected));
  });
});
