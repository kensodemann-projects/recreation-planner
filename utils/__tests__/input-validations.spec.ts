import { describe, expect, it } from 'vitest';
import { isEmail, isRequired } from '../input-validations';

describe('Input Validations', () => {
  describe('required', () => {
    const testCases: { name: string; value?: string | number | null; label?: string; expected: string }[] = [
      {
        name: 'is empty if there is a value',
        value: 'i',
        label: 'Does Not Matter',
        expected: '',
      },
      {
        name: 'returns an error message if empty',
        value: '',
        expected: 'Value is required',
      },
      {
        name: 'returns an error message if empty after trimming',
        value: '  ',
        expected: 'Value is required',
      },
      {
        name: 'returns an error message for undefined',
        expected: 'Value is required',
      },
      {
        name: 'returns an error message for null',
        value: null,
        expected: 'Value is required',
      },
      {
        name: 'uses the label in the error message',
        value: '',
        label: 'Email Address',
        expected: 'Email Address is required',
      },
      {
        name: 'is empty if there is a numeric value',
        value: 42,
        expected: '',
      },
      {
        name: 'is empty if the numeric value is zero',
        value: 0,
        expected: '',
      },
    ];

    it.each(testCases)('$name', ({ value, label, expected }) => expect(isRequired(value, label)).toEqual(expected));
  });

  describe('email', () => {
    const testCases = [
      {
        name: 'is empty if the value is a valid email',
        value: 'test@test.com',
        expected: '',
      },
      {
        name: 'returns an error message if the value is a plain string',
        value: 'test',
        expected: 'Please enter a valid email address.',
      },
      {
        name: 'returns an error message if the subdomain is missing',
        value: 'test@test.',
        expected: 'Please enter a valid email address.',
      },
    ];
    it.each(testCases)('$name', ({ value, expected }) => expect(isEmail(value)).toEqual(expected));
  });
});
