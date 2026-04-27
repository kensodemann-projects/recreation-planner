import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ITINERARY_ITEMS } from '../../../__mocks__/data';
import { canDeleteItineraryItem, fetchItineraryItem } from '../../../data';
import DeleteItineraryItemPage from '../page';

vi.mock('@/app/adventure/events/[id]/itinerary/data');
vi.mock('next/navigation');

describe('Delete Itinerary Item Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('fetches the itinerary item', async () => {
    await DeleteItineraryItemPage({ params: Promise.resolve({ id: '1', itineraryItemId: '3' }) });
    expect(fetchItineraryItem).toHaveBeenCalledExactlyOnceWith(3);
  });

  it('determines if the itinerary item can be deleted', async () => {
    await DeleteItineraryItemPage({ params: Promise.resolve({ id: '1', itineraryItemId: '3' }) });
    expect(canDeleteItineraryItem).toHaveBeenCalledExactlyOnceWith(ITINERARY_ITEMS.find((x) => x.id === 3));
  });

  it('renders the delete itinerary item component', async () => {
    const jsx = await DeleteItineraryItemPage({ params: Promise.resolve({ id: '1', itineraryItemId: '3' }) });
    render(jsx);
    expect(screen.getByRole('heading', { level: 1, name: 'Remove Itinerary Item' })).toBeDefined();
  });

  it('does not render the must be logged in component', async () => {
    const jsx = await DeleteItineraryItemPage({ params: Promise.resolve({ id: '1', itineraryItemId: '3' }) });
    render(jsx);
    expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
  });

  describe('if the itinerary item cannot be fetched', () => {
    it('renders an error message', async () => {
      const jsx = await DeleteItineraryItemPage({ params: Promise.resolve({ id: '1', itineraryItemId: '524' }) });
      render(jsx);
      expect(screen.getByText('Failed to fetch the itinerary item')).toBeDefined();
    });

    it('does not render the delete itinerary item component', async () => {
      const jsx = await DeleteItineraryItemPage({ params: Promise.resolve({ id: '1', itineraryItemId: '524' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Remove Itinerary Item' })).toBeNull();
    });
  });
});
