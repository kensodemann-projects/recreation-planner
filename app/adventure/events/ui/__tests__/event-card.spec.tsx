import { PLACES } from '@/app/adventure/places/__mocks__/data';
import { Event } from '@/models';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { EVENT_TYPES } from '../../__mocks__/data';
import EventCard from '../event-card';

describe('Event Card', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('renders the name in the title', () => {
    render(<EventCard event={TEST_EVENT} />);
    expect(screen.getByRole('heading', { level: 3, name: TEST_EVENT.name })).toBeDefined();
  });

  it('renders the date range in the sub-title', () => {
    render(<EventCard event={TEST_EVENT} />);
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Sep 28, 2024 at 6:30 PM - Sep 30, 2024 at 10:30 PM',
      }),
    ).toBeDefined();
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
