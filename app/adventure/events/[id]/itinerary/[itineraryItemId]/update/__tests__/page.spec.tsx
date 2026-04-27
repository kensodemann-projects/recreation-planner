import { fetchItineraryItem } from '@/app/adventure/events/[id]/itinerary/data';
import { EVENTS } from '@/app/adventure/events/__mocks__/data';
import { fetchEvent } from '@/app/adventure/events/data';
import { ItineraryItem } from '@/models';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ITINERARY_ITEMS } from '../../../__mocks__/data';
import UpdateItineraryItemPage from '../page';

vi.mock('@/app/adventure/events/data');
vi.mock('@/app/adventure/events/[id]/itinerary/data');
vi.mock('next/navigation');

describe('events itinerary item update page', () => {
  const testItineraryItem: ItineraryItem = ITINERARY_ITEMS.find((x) => x.eventRid === 4)!;
  const itineraryItemId = testItineraryItem.id!.toString();
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('finds a test itinerary item', () => {
    expect(testItineraryItem).toBeTruthy();
  });

  it('fetches the itinerary item', async () => {
    await UpdateItineraryItemPage({ params: Promise.resolve({ id: '4', itineraryItemId }) });
    expect(fetchItineraryItem).toHaveBeenCalledExactlyOnceWith(testItineraryItem.id);
  });

  it('fetches the event using the RID on the itinerary item', async () => {
    await UpdateItineraryItemPage({ params: Promise.resolve({ id: '14', itineraryItemId }) });
    expect(fetchEvent).toHaveBeenCalledExactlyOnceWith(testItineraryItem.eventRid);
  });

  it('renders the page headers', async () => {
    const jsx = await UpdateItineraryItemPage({ params: Promise.resolve({ id: '4', itineraryItemId }) });
    render(jsx);
    expect(screen.getByRole('heading', { level: 1, name: 'Update Itinerary Item' })).toBeDefined();
    expect(
      screen.getByRole('heading', { level: 2, name: `For Event: ${EVENTS.find((x) => x.id === 4)!.name}` }),
    ).toBeDefined();
  });

  it('does not render the must be logged in component', async () => {
    const jsx = await UpdateItineraryItemPage({ params: Promise.resolve({ id: '4', itineraryItemId }) });
    render(jsx);
    expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
  });

  it('does not renders a fetch failure message', async () => {
    const jsx = await UpdateItineraryItemPage({ params: Promise.resolve({ id: '4', itineraryItemId }) });
    render(jsx);
    expect(screen.queryByText('Failed to fetch the itinerary item')).toBeNull();
  });

  describe('if the itinerary item cannot be fetched', () => {
    it('does not fetch the extra data', async () => {
      await UpdateItineraryItemPage({ params: Promise.resolve({ id: '4', itineraryItemId: '42' }) });
      expect(fetchEvent).not.toHaveBeenCalled();
    });

    it('renders a simple error message', async () => {
      const jsx = await UpdateItineraryItemPage({ params: Promise.resolve({ id: '4', itineraryItemId: '42' }) });
      render(jsx);
      expect(screen.getByText('Failed to fetch the itinerary item')).toBeDefined();
    });

    it('does not render the page headers', async () => {
      const jsx = await UpdateItineraryItemPage({ params: Promise.resolve({ id: '4', itineraryItemId: '42' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Update Itinerary Item' })).toBeNull();
      expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await UpdateItineraryItemPage({ params: Promise.resolve({ id: '4', itineraryItemId: '42' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });
  });
});
