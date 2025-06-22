import { describe, expect, it } from 'vitest';
import { cityStatePostal, formatCurrency, formatDate, formatDateRange } from '../formatters';

describe('Formatters', () => {
  describe('date and time', () => {
    it('formats the date', () => {
      expect(formatDate('2024-09-26')).toEqual('Sep 26, 2024');
    });

    it('formats the date and time', () => {
      expect(formatDate('2024-09-26', '17:15')).toEqual('Sep 26, 2024 at 5:15 PM');
    });
  });

  describe('date range', () => {
    it('formats a single date', () => {
      expect(formatDateRange('2024-09-26')).toEqual('Sep 26, 2024');
    });

    it('formats a single date/time', () => {
      expect(formatDateRange('2024-09-26', '17:15')).toEqual('Sep 26, 2024 at 5:15 PM');
    });

    it('formats a begin and end date', () => {
      expect(formatDateRange('2024-09-26', undefined, '2024-09-30')).toEqual('Sep 26, 2024 - Sep 30, 2024');
    });

    it('formats a begin and end date / time', () => {
      expect(formatDateRange('2024-09-26', '15:42', '2024-09-30', '08:34')).toEqual(
        'Sep 26, 2024 at 3:42 PM - Sep 30, 2024 at 8:34 AM',
      );
    });

    it('formats a date with a begin and end time', () => {
      expect(formatDateRange('2024-09-26', '08:42', undefined, '15:34')).toEqual('Sep 26, 2024 at 8:42 AM to 3:34 PM');
    });
  });

  describe('City, State Postal', () => {
    it('formats just the city', () => {
      expect(cityStatePostal('Waukesha')).toEqual('Waukesha');
    });

    it('formats just the state', () => {
      expect(cityStatePostal(null, 'WI')).toEqual('WI');
    });

    it('formats just the postal code', () => {
      expect(cityStatePostal(null, null, '53189')).toEqual('53189');
    });

    it('formats the city and postal code', () => {
      expect(cityStatePostal('Waukesha', null, '53189')).toEqual('Waukesha 53189');
    });

    it('formats the state and postal code', () => {
      expect(cityStatePostal(null, 'WI', '53189')).toEqual('WI 53189');
    });

    it('formats the city and state', () => {
      expect(cityStatePostal('Waukesha', 'WI')).toEqual('Waukesha, WI');
    });

    it('formats the city, state, and postal code ', () => {
      expect(cityStatePostal('Waukesha', 'WI', '53189')).toEqual('Waukesha, WI 53189');
    });
  });

  describe('currency', () => {
    it('formats to blank for null-ish values', () => {
      expect(formatCurrency()).toEqual('');
    });

    it('formats for US dollars', () => {
      expect(formatCurrency(0)).toEqual('$0.00');
      expect(formatCurrency(1)).toEqual('$1.00');
      expect(formatCurrency(139.24)).toEqual('$139.24');
      expect(formatCurrency(2139.24)).toEqual('$2,139.24');
      expect(formatCurrency(9822139.24)).toEqual('$9,822,139.24');
    });
  });
});
