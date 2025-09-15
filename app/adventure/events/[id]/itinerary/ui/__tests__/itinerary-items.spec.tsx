import { ItineraryItem } from '@/models';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ItineraryItems from '../itinerary-items';

describe('itinerary items list', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('displays each item', () => {
    render(<ItineraryItems items={TEST_ITEMS} baseHref="/adventure/events/42/itinerary-items" />);
    expect(screen.queryAllByRole('listitem').length).toBe(TEST_ITEMS.length);
  });
});

const TEST_ITEMS: ItineraryItem[] = [
  {
    id: 1,
    name: 'This test has a descr',
    description: 'Well, that is so exciting!',
    eventRid: 73,
    date: '2025-05-15',
    time: '15:35',
  },
  { id: 2, name: 'This has a null description', description: null, eventRid: 73, date: '2025-05-15', time: '18:15' },
  {
    id: 3,
    name: 'Test, test, test',
    description: 'This is more and more test data.',
    eventRid: 73,
    date: '2025-05-15',
    time: '15:35',
  },
  { id: 4, name: 'In the fridge', description: 'I see dead things!', eventRid: 73, date: '2025-05-16', time: '06:00' },
  {
    id: 5,
    name: 'Love can hurt',
    description: 'She was the apple of my eye, but she is a reptile.',
    eventRid: 73,
    date: '2025-05-16',
    time: '11:40',
  },
  {
    id: 6,
    name: 'Poison me',
    description: 'Let the flickering and rattling begin.',
    eventRid: 73,
    date: '2025-05-17',
    time: '05:00',
  },
];
