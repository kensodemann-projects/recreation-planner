import { ItineraryItem } from '@/models';
import { ITINERARY_ITEMS } from '@/app/adventure/events/[id]/itinerary/__mocks__/data';
import { redirect } from 'next/navigation';
import { describe, beforeEach, vi, it, expect } from 'vitest';
import { deleteConfirmed, deleteAborted } from '../actions';
import { deleteItineraryItem } from '@/app/adventure/events/[id]/itinerary/data';

vi.mock('@/app/adventure/events/[id]/itinerary/data');
vi.mock('next/navigation');

const itineraryItem: ItineraryItem = ITINERARY_ITEMS.find((i) => i.id === 1)!;

describe('itinerary item delete actions', () => {
  beforeEach(() => vi.clearAllMocks());

  describe('deleteConfirmed', () => {
    it('calls deleteItineraryItem with the specified item', async () => {
      await deleteConfirmed(103, itineraryItem);
      expect(deleteItineraryItem).toHaveBeenCalledExactlyOnceWith(itineraryItem);
    });

    it('redirects to the event details page', async () => {
      await deleteConfirmed(103, itineraryItem);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/events/103?lastActivity=Itinerary');
    });
  });

  describe('deleteAborted', () => {
    it('does not call deleteItineraryItem', async () => {
      await deleteAborted(103);
      expect(deleteItineraryItem).not.toHaveBeenCalled();
    });

    it('redirects to the event details page', async () => {
      await deleteAborted(103);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/events/103?lastActivity=Itinerary');
    });
  });
});
