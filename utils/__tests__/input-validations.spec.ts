import { describe, expect, it } from 'vitest';
import { isEmail, isRequired } from '../input-validations';

describe('Input Validations', () => {
  describe('required', () => {
    it('is empty if there is a value', () => {
      expect(isRequired('i')).toEqual('');
    });

    it('returns an error message if empty', () => {
      expect(isRequired('')).toEqual('Value is required');
    });

    it('trims the input value', () => {
      expect(isRequired(' ')).toEqual('Value is required');
    });

    it('uses the label if given', () => {
      expect(isRequired('', 'Email Address')).toEqual('Email Address is required');
    });
  });

  describe('email', () => {
    it('is empty if the input is a valid email', () => {
      expect(isEmail('test@test.com')).toEqual('');
    });

    it('returns an error message if no @', () => {
      expect(isEmail('test.test.com')).toEqual('Please enter a valid email address.');
    });

    it('returns an error message if plain string', () => {
      expect(isEmail('test')).toEqual('Please enter a valid email address.');
    });

    it('returns an error message if subdomain is missing', () => {
      expect(isEmail('test@test.')).toEqual('Please enter a valid email address.');
    });
  });
});
