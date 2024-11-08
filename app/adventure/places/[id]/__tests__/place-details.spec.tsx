import { Place } from '@/models';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import PlaceDetails from '../place-details';

const testPlace: Place = {
  id: 3,
  name: 'Richard Bong State Park',
  description: 'A very large state park named after a WWII flying ace.',
  address: {
    line1: '26313 Burlington Rd.',
    city: 'Kansasville',
    state: 'WI',
    postal: '53139',
  },
  type: {
    id: 1,
    name: 'State Park',
  },
  phoneNumber: '(262) 878-5600',
  website: 'https://dnr.wisconsin.gov/topic/parks/richardbong',
};
describe('Place', () => {
  afterEach(() => cleanup());

  it('renders the name', () => {
    render(<PlaceDetails place={testPlace} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Richard Bong State Park' })).toBeDefined();
  });

  it('renders the description', () => {
    render(<PlaceDetails place={testPlace} />);
    expect(screen.getByText('A very large state park named after a WWII flying ace.')).toBeDefined();
  });

  describe('if address information exists', () => {
    it('displays the address header', () => {
      render(<PlaceDetails place={testPlace} />);
      expect(screen.getByRole('heading', { level: 2, name: 'Address' })).toBeDefined();
    });

    it('displays the address line', () => {
      render(<PlaceDetails place={testPlace} />);
      expect(screen.getByText('26313 Burlington Rd.')).toBeDefined();
    });

    it('formats the city state line', () => {
      render(<PlaceDetails place={testPlace} />);
      expect(screen.getByText('Kansasville, WI 53139')).toBeDefined();
    });
  });

  describe('if the address information is empty', () => {
    it('does not display the address header', () => {
      const place = { ...testPlace, address: {} };
      render(<PlaceDetails place={place} />);
      expect(screen.queryByRole('heading', { level: 2, name: 'Address' })).toBeNull();
    });
  });

  it('has a section where the other information is displayed', () => {
    render(<PlaceDetails place={testPlace} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Other Information' })).toBeDefined();
  });

  it('displays the type', () => {
    render(<PlaceDetails place={testPlace} />);
    expect(screen.getByText('Type:').parentElement?.textContent).toBe('Type: State Park');
  });

  describe('phone number', () => {
    it('is displayed if there is one', () => {
      render(<PlaceDetails place={testPlace} />);
      expect(screen.getByText('Phone Number:').parentElement?.textContent).toBe('Phone Number: (262) 878-5600');
    });

    it('is not displayed if there is no phone number', () => {
      const { phoneNumber, ...place } = testPlace;
      render(<PlaceDetails place={place} />);
      expect(screen.queryByText('Phone Number:')).toBeNull();
    });
  });

  describe('website', () => {
    it('is displayed if there is one', () => {
      render(<PlaceDetails place={testPlace} />);
      expect(screen.getByText('Website:').parentElement?.textContent).toBe(
        'Website: https://dnr.wisconsin.gov/topic/parks/richardbong',
      );
    });

    it('creates a link', () => {
      render(<PlaceDetails place={testPlace} />);
      expect(screen.getByRole('link', { name: 'https://dnr.wisconsin.gov/topic/parks/richardbong' })).toBeDefined();
    });

    it('is not displayed if there is no phone number', () => {
      const { website, ...place } = testPlace;
      render(<PlaceDetails place={place} />);
      expect(screen.queryByText('Website:')).toBeNull();
    });
  });
});
