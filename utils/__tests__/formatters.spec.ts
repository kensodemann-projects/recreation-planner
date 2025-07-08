import { describe, expect, it } from 'vitest';
import { cityStatePostal, formatCurrency, formatDate, formatDateRange } from '../formatters';

describe('Formatters', () => {
  describe('date and time', () => {
    const testCases = [
      {
        name: 'handles a null date and time',
        date: null,
        time: null,
        expected: '',
      },
      {
        name: 'formats a date',
        date: '2024-09-26',
        time: null,
        expected: 'Sep 26, 2024',
      },
      {
        name: 'formats a date and time',
        date: '2022-05-03',
        time: '17:15',
        expected: 'May 3, 2022 at 5:15 PM',
      },
    ];

    it.each(testCases)('$name', ({ date, time, expected }) => expect(formatDate(date, time)).toEqual(expected));
  });

  describe('date range', () => {
    const testCases = [
      {
        name: 'formats a single date',
        beginDate: '2024-09-26',
        beginTime: null,
        endDate: null,
        endTime: null,
        expected: 'Sep 26, 2024',
      },
      {
        name: 'formats a single date/Time',
        beginDate: '2025-04-15',
        beginTime: '17:15',
        endDate: null,
        endTime: null,
        expected: 'Apr 15, 2025 at 5:15 PM',
      },
      {
        name: 'formats a begin and end date / time',
        beginDate: '2024-09-26',
        beginTime: '15:42',
        endDate: '2024-09-30',
        endTime: '08:34',
        expected: 'Sep 26, 2024 at 3:42 PM - Sep 30, 2024 at 8:34 AM',
      },
      {
        name: 'formats a begin date and end date / time',
        beginDate: '2024-09-26',
        beginTime: null,
        endDate: '2024-09-30',
        endTime: '08:34',
        expected: 'Sep 26, 2024 - Sep 30, 2024 at 8:34 AM',
      },
      {
        name: 'formats a begin date / time and end date',
        beginDate: '2024-08-30',
        beginTime: '08:34',
        endDate: '2024-09-01',
        endTime: null,
        expected: 'Aug 30, 2024 at 8:34 AM - Sep 1, 2024',
      },
      {
        name: 'formats a date with a begin and end time',
        beginDate: '2024-09-26',
        beginTime: '08:42',
        endDate: null,
        endTime: '15:34',
        expected: 'Sep 26, 2024 at 8:42 AM to 3:34 PM',
      },
    ];

    it.each(testCases)('$name', ({ beginDate, beginTime, endDate, endTime, expected }) =>
      expect(formatDateRange(beginDate, beginTime, endDate, endTime)).toEqual(expected),
    );
  });

  describe('City, State Postal', () => {
    const testCases = [
      {
        name: 'formats just the city',
        city: 'Waukesha',
        stateCode: null,
        postalCode: null,
        expected: 'Waukesha',
      },
      {
        name: 'formats just the state',
        city: null,
        stateCode: 'WI',
        postalCode: null,
        expected: 'WI',
      },
      {
        name: 'formats just the postal code',
        city: null,
        stateCode: null,
        postalCode: '53189',
        expected: '53189',
      },
      {
        name: 'formats the city and postal code',
        city: 'Waukesha',
        stateCode: null,
        postalCode: '53189',
        expected: 'Waukesha 53189',
      },
      {
        name: 'formats the state and postal code',
        city: null,
        stateCode: 'WI',
        postalCode: '53189',
        expected: 'WI 53189',
      },
      {
        name: 'formats the city and state',
        city: 'Madison',
        stateCode: 'WI',
        postalCode: null,
        expected: 'Madison, WI',
      },
      {
        name: 'formats the city, state and postal code',
        city: 'Madison',
        stateCode: 'WI',
        postalCode: '53702',
        expected: 'Madison, WI 53702',
      },
    ];

    it.each(testCases)('$name', ({ city, stateCode, postalCode, expected }) =>
      expect(cityStatePostal(city, stateCode, postalCode)).toEqual(expected),
    );
  });

  describe('currency', () => {
    const testCases = [
      {
        name: 'formats to blank for null',
        value: null,
        expected: '',
      },
      {
        name: 'formats to blank for undefined',
        value: undefined,
        expected: '',
      },
      {
        name: 'formats to US dollars for zero',
        value: 0,
        expected: '$0.00',
      },
      {
        name: 'formats to US dollars for a single dollar',
        value: 1,
        expected: '$1.00',
      },
      {
        name: 'formats to US dollars for < 1000',
        value: 139.24,
        expected: '$139.24',
      },
      {
        name: 'formats to US dollars for > 1,000',
        value: 2139.24,
        expected: '$2,139.24',
      },
      {
        name: 'formats to US dollars for > 1,000,000',
        value: 9822139.24,
        expected: '$9,822,139.24',
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) => {
      expect(formatCurrency(value)).toEqual(expected);
    });
  });
});
