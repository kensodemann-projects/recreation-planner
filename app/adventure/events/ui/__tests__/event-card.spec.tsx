import { PLACES } from '@/app/adventure/places/__mocks__/data';
import { Event } from '@/models';
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { EVENT_TYPES } from '../../__mocks__/data';
import EventCard from '../event-card';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

describe('Event Card', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('renders the date range in the title', () => {
    render(<EventCard event={TEST_EVENT} />);
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Sep 28, 2024 at 6:30 PM - Sep 30, 2024 at 10:30 PM',
      }),
    ).toBeDefined();
  });

  it('renders the name in the sub-title', () => {
    render(<EventCard event={TEST_EVENT} />);
    expect(screen.getByRole('heading', { level: 4, name: TEST_EVENT.name })).toBeDefined();
  });

  it('renders the location', () => {
    render(<EventCard event={TEST_EVENT} />);
    expect(screen.getByText(TEST_EVENT.place.name)).toBeDefined();
  });

  it('renders the event type', () => {
    render(<EventCard event={TEST_EVENT} />);
    expect(screen.getByText(TEST_EVENT.type.name)).toBeDefined();
  });

  describe('delete link', () => {
    it('links to the delete page for the event', () => {
      render(<EventCard event={TEST_EVENT} callingPage="/adventure" />);
      const link = screen.getByRole('button', { name: /delete/i }).closest('a');
      expect(link?.getAttribute('href')).toBe(`adventure/events/${TEST_EVENT.id}/delete?callingPage=/adventure`);
    });

    it('includes an undefined callingPage when not provided', () => {
      render(<EventCard event={TEST_EVENT} />);
      const link = screen.getByRole('button', { name: /delete/i }).closest('a');
      expect(link?.getAttribute('href')).toBe(`adventure/events/${TEST_EVENT.id}/delete?callingPage=undefined`);
    });
  });

  describe('edit link', () => {
    it('links to the update page for the event', () => {
      render(<EventCard event={TEST_EVENT} callingPage="/adventure" />);
      const link = screen.getByRole('button', { name: /edit/i }).closest('a');
      expect(link?.getAttribute('href')).toBe(`adventure/events/${TEST_EVENT.id}/update?callingPage=/adventure`);
    });

    it('includes an undefined callingPage when not provided', () => {
      render(<EventCard event={TEST_EVENT} />);
      const link = screen.getByRole('button', { name: /edit/i }).closest('a');
      expect(link?.getAttribute('href')).toBe(`adventure/events/${TEST_EVENT.id}/update?callingPage=undefined`);
    });
  });
});

const TEST_EVENT: Event = {
  id: 314,
  beginDate: '2024-09-28',
  beginTime: '18:30',
  endDate: '2024-09-30',
  endTime: '22:30',
  name: "Women's Hockey Tournament",
  description: 'A three day long tournament of women playing hockey',
  place: PLACES[3],
  type: EVENT_TYPES[1],
};
