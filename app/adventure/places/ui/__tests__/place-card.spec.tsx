import { Place } from '@/models';
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PLACE_TYPES } from '../../__mocks__/data';
import PlaceCard from '../place-card';

describe('Place Card', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('main title', () => {
    it('renders the place name', () => {
      render(<PlaceCard place={TEST_PLACE} />);
      expect(screen.getByRole('heading', { level: 3, name: TEST_PLACE.name })).toBeDefined();
    });

    it('links to the place detail page', () => {
      render(<PlaceCard place={TEST_PLACE} callingPage="/adventure/places" />);
      const headerLink = screen.getByRole('heading', { level: 3 });
      const link = within(headerLink).getByRole('link', { name: TEST_PLACE.name });
      expect(link.getAttribute('href')).toBe(`/adventure/places/${TEST_PLACE.id}?callingPage=/adventure/places`);
    });

    it('does not include the search parameter when callingPage is not provided', () => {
      render(<PlaceCard place={TEST_PLACE} />);
      const link = screen.getByRole('link', { name: TEST_PLACE.name });
      expect(link.getAttribute('href')).toBe(`/adventure/places/${TEST_PLACE.id}`);
    });
  });

  describe('sub title', () => {
    it('renders the place type', () => {
      render(<PlaceCard place={TEST_PLACE} />);
      expect(screen.getByRole('heading', { level: 4, name: TEST_PLACE.type.name })).toBeDefined();
    });
  });

  describe('address', () => {
    it('renders the address when present', () => {
      render(<PlaceCard place={TEST_PLACE} />);
      expect(screen.getByText(TEST_PLACE.address.line1!)).toBeDefined();
    });

    it('does not render the address when not present', () => {
      render(<PlaceCard place={TEST_PLACE_NO_ADDRESS} />);
      expect(screen.queryByText(TEST_PLACE.address.line1!)).toBeNull();
    });
  });

  describe('phone number', () => {
    it('renders the phone number when present', () => {
      render(<PlaceCard place={TEST_PLACE} />);
      expect(screen.getByText(TEST_PLACE.phoneNumber!)).toBeDefined();
    });

    it('does not render the phone number when not present', () => {
      render(<PlaceCard place={TEST_PLACE_NO_PHONE} />);
      expect(screen.queryByText(TEST_PLACE.phoneNumber!)).toBeNull();
    });
  });

  describe('delete link', () => {
    it('links to the delete page for the place', () => {
      render(<PlaceCard place={TEST_PLACE} callingPage="/adventure/places" />);
      const link = screen.getByRole('button', { name: /delete/i }).closest('a');
      expect(link?.getAttribute('href')).toBe(
        `/adventure/places/${TEST_PLACE.id}/delete?callingPage=/adventure/places`,
      );
    });

    it('does not include the search parameter when callingPage is not provided', () => {
      render(<PlaceCard place={TEST_PLACE} />);
      const link = screen.getByRole('button', { name: /delete/i }).closest('a');
      expect(link?.getAttribute('href')).toBe(`/adventure/places/${TEST_PLACE.id}/delete`);
    });
  });

  describe('edit link', () => {
    it('links to the update page for the place', () => {
      render(<PlaceCard place={TEST_PLACE} callingPage="/adventure/places" />);
      const link = screen.getByRole('button', { name: /edit/i }).closest('a');
      expect(link?.getAttribute('href')).toBe(
        `/adventure/places/${TEST_PLACE.id}/update?callingPage=/adventure/places`,
      );
    });

    it('does not include the search parameter when callingPage is not provided', () => {
      render(<PlaceCard place={TEST_PLACE} />);
      const link = screen.getByRole('button', { name: /edit/i }).closest('a');
      expect(link?.getAttribute('href')).toBe(`/adventure/places/${TEST_PLACE.id}/update`);
    });
  });
});

const TEST_PLACE: Place = {
  id: 42,
  name: 'Burnet State Park',
  description: null,
  address: {
    line1: '23125 255th St.',
    line2: null,
    city: 'Cornell',
    state: 'WI',
    postal: '54732',
  },
  type: PLACE_TYPES[0],
  phoneNumber: '(715) 239-6888',
  website: null,
};

const TEST_PLACE_NO_ADDRESS: Place = {
  ...TEST_PLACE,
  address: {
    line1: null,
    line2: null,
    city: null,
    state: null,
    postal: null,
  },
};

const TEST_PLACE_NO_PHONE: Place = {
  ...TEST_PLACE,
  phoneNumber: null,
};
