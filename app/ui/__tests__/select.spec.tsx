import { CommonData } from '@/models/common-data';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Select from '../select';

describe('Select Component', () => {
  afterEach(() => cleanup());

  it('labels the select', () => {
    render(
      <Select id="test-me" label="I am a test" values={testData} value={4} onChange={() => null} onBlur={() => null} />,
    );
    expect(screen.getByRole('combobox', { name: 'I am a test' })).toBeDefined();
    expect(screen.getByLabelText('I am a test', { selector: 'select' })).toBeDefined();
  });

  describe('with an error', () => {
    it('displays the error', () => {
      render(
        <Select
          id="test-me"
          label="I am a test"
          error="I am in error"
          values={testData}
          value={4}
          onChange={() => null}
          onBlur={() => null}
        />,
      );
      expect(screen.getByText('I am in error')).toBeDefined();
    });

    it('is marked as an error', () => {
      render(
        <Select
          id="test-me"
          label="I am a test"
          error="I am in error"
          values={testData}
          value={4}
          onChange={() => null}
          onBlur={() => null}
        />,
      );
      const select = screen.getByRole('combobox');
      expect(select.classList).toContain('select-error');
    });
  });
});

const testData: Array<CommonData> = [
  {
    id: 7,
    name: 'Attraction',
    description: 'A general destination not specified by any of the other types of places.',
  },
  {
    id: 5,
    name: 'Campground',
    description:
      'Public or privately held camping facility. If part of a state park, consider using State Park as the designation instead.',
  },
  {
    id: 6,
    name: 'Lodging',
    description: 'Hotel, Motel, Bed and Breakfast or other such establishment.',
  },
  {
    id: 2,
    name: 'Motorplex',
    description: 'Race track or related facility specifically for enjoying motor sports.',
  },
  {
    id: 8,
    name: 'Museum',
    description: 'A place to learn about the history of an area or event.',
  },
  {
    id: 4,
    name: 'Restaurant',
    description: 'A restaurant or bar primarily used as an establishment for eating.',
  },
  {
    id: 3,
    name: 'Sports Arena',
    description: 'An arena or other similar sports facility such as a baseball park or soccer pitch.',
  },
  {
    id: 1,
    name: 'State Park',
    description:
      'Government owned land run by the DNR of the state. Generally requires a state sticker for access. Often used for camping, hiking, biking, or various day trips.',
  },
];
