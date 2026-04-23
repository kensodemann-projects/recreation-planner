import { ITINERARY_ITEMS } from '@/app/adventure/events/[id]/itinerary/__mocks__/data';
import { updateItineraryItem } from '@/app/adventure/events/[id]/itinerary/data';
import { ItineraryItem } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { updateConfirmed } from '../actions';

vi.mock('@/app/adventure/events/[id]/itinerary/data');
vi.mock('next/navigation');

const itineraryItem: ItineraryItem = { ...ITINERARY_ITEMS.find((i) => i.id === 1)!, eventRid: 17 };

describe('itinerary item updateConfirmed', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls updateItineraryItem with the specified itinerary item', async () => {
    await updateConfirmed(itineraryItem);
    expect(updateItineraryItem).toHaveBeenCalledExactlyOnceWith(itineraryItem);
  });

  describe('when updateItineraryItem succeeds', () => {
    beforeEach(() => {
      (updateItineraryItem as Mock).mockResolvedValue(itineraryItem);
    });

    it('redirects to the event details page', async () => {
      await updateConfirmed(itineraryItem);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/events/17?lastActivity=Itinerary');
    });
  });

  describe('when updateItineraryItem fails', () => {
    beforeEach(() => {
      (updateItineraryItem as Mock).mockResolvedValue(null);
    });

    it('redirects to /error', async () => {
      await updateConfirmed(itineraryItem);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
