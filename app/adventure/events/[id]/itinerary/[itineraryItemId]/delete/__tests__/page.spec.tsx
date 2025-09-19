import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { ITINERARY_ITEMS } from '../../../__mocks__/data';
import { canDeleteItineraryItem, fetchItineraryItem } from '../../../data';
import DeleteItineraryItemPage from '../page';

vi.mock('@/app/adventure/events/[id]/itinerary/data');
vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');

describe('Delete Itinerary Item Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

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

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
    });

    it('does not fetch the itinerary item', async () => {
      await DeleteItineraryItemPage({ params: Promise.resolve({ id: '1', itineraryItemId: '3' }) });
      expect(fetchItineraryItem).not.toHaveBeenCalled();
    });

    it('does not determine if the itinerary item can be deleted', async () => {
      await DeleteItineraryItemPage({ params: Promise.resolve({ id: '1', itineraryItemId: '3' }) });
      expect(canDeleteItineraryItem).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await DeleteItineraryItemPage({ params: Promise.resolve({ id: '1', itineraryItemId: '3' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not render the delete itinerary item component', async () => {
      const jsx = await DeleteItineraryItemPage({ params: Promise.resolve({ id: '1', itineraryItemId: '3' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Remove Itinerary Item' })).toBeNull();
    });
  });
});
