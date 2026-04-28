import { executeQuery } from '@/utils/data';
import { createClient } from '@/utils/supabase/server';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import {
  addItineraryItem,
  canDeleteItineraryItem,
  deleteItineraryItem,
  fetchItineraryItem,
  updateItineraryItem,
} from '../data';
import { buildChainableMock, setLoggedIn, setLoggedOut } from '@/test-utils/data-helpers';

vi.mock('@/utils/supabase/server');
vi.mock('@/utils/data', () => ({ executeQuery: vi.fn() }));

// --- Test data ---

const itineraryItemDTO = {
  id: 1,
  name: 'Set up the campsite',
  description: 'I will concentrate on the outside, Lisa the inside.',
  date: '2025-07-03',
  time: '15:00',
  event_rid: 14,
};

const itineraryItem = {
  id: 1,
  name: 'Set up the campsite',
  description: 'I will concentrate on the outside, Lisa the inside.',
  date: '2025-07-03',
  time: '15:00',
  eventRid: 14,
};

// --- Tests ---

describe('itinerary data', () => {
  let mockFrom: Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    const chain = buildChainableMock();
    mockFrom = vi.fn().mockReturnValue(chain);
    const client = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(createClient).mockReturnValue({ ...client, from: mockFrom } as any);
    vi.clearAllMocks();
  });

  // ---------------------------------------------------------------------------
  // fetchItineraryItem
  // ---------------------------------------------------------------------------

  describe('fetchItineraryItem', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns null', async () => {
        expect(await fetchItineraryItem(1)).toBeNull();
      });

      it('does not access the database', async () => {
        await fetchItineraryItem(1);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: true, data: itineraryItemDTO });
        });

        it('calls executeQuery', async () => {
          await fetchItineraryItem(1);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the itinerary_items table', async () => {
          await fetchItineraryItem(1);
          expect(mockFrom).toHaveBeenCalledWith('itinerary_items');
        });

        it('returns the converted itinerary item', async () => {
          expect(await fetchItineraryItem(1)).toEqual(itineraryItem);
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'NOT_FOUND' });
        });

        it('returns null', async () => {
          expect(await fetchItineraryItem(1)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // addItineraryItem
  // ---------------------------------------------------------------------------

  describe('addItineraryItem', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns null', async () => {
        expect(await addItineraryItem(itineraryItem)).toBeNull();
      });

      it('does not access the database', async () => {
        await addItineraryItem(itineraryItem);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when the insert succeeds', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: true, data: itineraryItemDTO });
        });

        it('calls executeQuery', async () => {
          await addItineraryItem(itineraryItem);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('inserts into the itinerary_items table', async () => {
          await addItineraryItem(itineraryItem);
          expect(mockFrom).toHaveBeenCalledWith('itinerary_items');
        });

        it('returns the converted itinerary item', async () => {
          expect(await addItineraryItem(itineraryItem)).toEqual(itineraryItem);
        });
      });

      describe('when the insert fails', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'SERVER_ERROR' });
        });

        it('returns null', async () => {
          expect(await addItineraryItem(itineraryItem)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // canDeleteItineraryItem
  // ---------------------------------------------------------------------------

  describe('canDeleteItineraryItem', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns false', async () => {
        expect(await canDeleteItineraryItem(itineraryItem)).toBe(false);
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      it('returns true', async () => {
        expect(await canDeleteItineraryItem(itineraryItem)).toBe(true);
      });
    });
  });

  // ---------------------------------------------------------------------------
  // deleteItineraryItem
  // ---------------------------------------------------------------------------

  describe('deleteItineraryItem', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns false', async () => {
        expect(await deleteItineraryItem(itineraryItem)).toBe(false);
      });

      it('does not access the database', async () => {
        await deleteItineraryItem(itineraryItem);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      describe('when the delete succeeds', () => {
        beforeEach(() => {
          setLoggedIn();
          (executeQuery as Mock).mockResolvedValue({ success: true, data: null });
        });

        it('calls executeQuery', async () => {
          await deleteItineraryItem(itineraryItem);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('deletes from the itinerary_items table', async () => {
          await deleteItineraryItem(itineraryItem);
          expect(mockFrom).toHaveBeenCalledWith('itinerary_items');
        });

        it('returns true', async () => {
          expect(await deleteItineraryItem(itineraryItem)).toBe(true);
        });
      });

      describe('when the delete fails', () => {
        beforeEach(() => {
          setLoggedIn();
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'SERVER_ERROR' });
        });

        it('returns false', async () => {
          expect(await deleteItineraryItem(itineraryItem)).toBe(false);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // updateItineraryItem
  // ---------------------------------------------------------------------------

  describe('updateItineraryItem', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns null', async () => {
        expect(await updateItineraryItem(itineraryItem)).toBeNull();
      });

      it('does not access the database', async () => {
        await updateItineraryItem(itineraryItem);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when the update succeeds', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: true, data: itineraryItemDTO });
        });

        it('calls executeQuery', async () => {
          await updateItineraryItem(itineraryItem);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('updates the itinerary_items table', async () => {
          await updateItineraryItem(itineraryItem);
          expect(mockFrom).toHaveBeenCalledWith('itinerary_items');
        });

        it('returns the converted itinerary item', async () => {
          expect(await updateItineraryItem(itineraryItem)).toEqual(itineraryItem);
        });
      });

      describe('when the update fails', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'SERVER_ERROR' });
        });

        it('returns null', async () => {
          expect(await updateItineraryItem(itineraryItem)).toBeNull();
        });
      });
    });
  });
});
