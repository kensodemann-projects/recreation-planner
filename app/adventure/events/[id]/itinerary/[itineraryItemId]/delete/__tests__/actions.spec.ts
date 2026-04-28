import { ItineraryItem } from '@/models';
import { ITINERARY_ITEMS } from '@/app/adventure/events/[id]/itinerary/__mocks__/data';
import { redirect } from 'next/navigation';
import { describe, beforeEach, vi, it, expect, type Mock } from 'vitest';
import { deleteConfirmed, deleteAborted } from '../actions';
import { deleteItineraryItem } from '@/app/adventure/events/[id]/itinerary/data';

vi.mock('@/app/adventure/events/[id]/itinerary/data');
vi.mock('next/navigation');

const itineraryItem: ItineraryItem = ITINERARY_ITEMS.find((i) => i.id === 1)!;

describe('itinerary item delete actions', () => {
  beforeEach(() => vi.clearAllMocks());

  describe('deleteConfirmed', () => {
    it('calls deleteItineraryItem with the specified item', async () => {
      await deleteConfirmed(103, itineraryItem).catch(() => {});
      expect(deleteItineraryItem).toHaveBeenCalledExactlyOnceWith(itineraryItem);
    });

    it('redirects to the event details page if the delete succeeds', async () => {
      (deleteItineraryItem as Mock).mockResolvedValue(true);
      await deleteConfirmed(103, itineraryItem).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/events/103?lastActivity=Itinerary');
    });

    it('redirects to /error if the delete fails', async () => {
      (deleteItineraryItem as Mock).mockResolvedValue(false);
      await deleteConfirmed(103, itineraryItem).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });

  describe('deleteAborted', () => {
    it('does not call deleteItineraryItem', async () => {
      await deleteAborted(103).catch(() => {});
      expect(deleteItineraryItem).not.toHaveBeenCalled();
    });

    it('redirects to the event details page', async () => {
      await deleteAborted(103).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/events/103?lastActivity=Itinerary');
    });
  });
});
