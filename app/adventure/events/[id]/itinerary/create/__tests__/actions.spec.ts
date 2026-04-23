import { ITINERARY_ITEMS } from '@/app/adventure/events/[id]/itinerary/__mocks__/data';
import { addItineraryItem } from '@/app/adventure/events/[id]/itinerary/data';
import { ItineraryItem } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { createConfirmed } from '../actions';

vi.mock('@/app/adventure/events/[id]/itinerary/data');
vi.mock('next/navigation');

const itineraryItem: ItineraryItem = { ...ITINERARY_ITEMS.find((i) => i.id === 3)!, id: undefined, eventRid: 332 };

describe('itinerary: createConfirmed', () => {
  beforeEach(() => vi.clearAllMocks());
  it('calls addItineraryItem with the specified itinerary item', async () => {
    await createConfirmed(itineraryItem);
    expect(addItineraryItem).toHaveBeenCalledExactlyOnceWith(itineraryItem);
  });

  describe('when addItineraryItem succeeds', () => {
    beforeEach(() => {
      (addItineraryItem as Mock).mockResolvedValue({ ...itineraryItem, id: 73 });
    });

    it('redirects to the event details page', async () => {
      await createConfirmed(itineraryItem);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/events/332?lastActivity=Itinerary');
    });
  });

  describe('when addItineraryItem fails', () => {
    beforeEach(() => {
      (addItineraryItem as Mock).mockResolvedValue(null);
    });

    it('redirects to /error', async () => {
      await createConfirmed(itineraryItem);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
