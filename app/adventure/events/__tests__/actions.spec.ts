import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { setShowAllPriorEvents, setShowAllUpcomingEvents } from '../actions';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

vi.mock('next/headers', () => ({
  cookies: vi.fn().mockResolvedValue({ set: vi.fn() }),
}));

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));

describe('Events Actions', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => vi.clearAllMocks());

  describe('setShowAllUpcomingEvents', () => {
    it('sets the show-all-upcoming-events cookie to true when called with true', async () => {
      const cookieStore = await cookies();
      await setShowAllUpcomingEvents(true);
      expect(cookieStore.set).toHaveBeenCalledExactlyOnceWith('show-all-upcoming-events', 'true', {
        maxAge: 60 * 60 * 24 * 365,
      });
    });

    it('sets the show-all-upcoming-events cookie to false when called with false', async () => {
      const cookieStore = await cookies();
      await setShowAllUpcomingEvents(false);
      expect(cookieStore.set).toHaveBeenCalledExactlyOnceWith('show-all-upcoming-events', 'false', {
        maxAge: 60 * 60 * 24 * 365,
      });
    });

    it('calls revalidatePath for the events page', async () => {
      await setShowAllUpcomingEvents(true);
      expect(revalidatePath).toHaveBeenCalledExactlyOnceWith('/adventure/events');
    });
  });

  describe('setShowAllPriorEvents', () => {
    it('sets the show-all-prior-events cookie to true when called with true', async () => {
      const cookieStore = await cookies();
      await setShowAllPriorEvents(true);
      expect(cookieStore.set).toHaveBeenCalledExactlyOnceWith('show-all-prior-events', 'true', {
        maxAge: 60 * 60 * 24 * 365,
      });
    });

    it('sets the show-all-prior-events cookie to false when called with false', async () => {
      const cookieStore = await cookies();
      await setShowAllPriorEvents(false);
      expect(cookieStore.set).toHaveBeenCalledExactlyOnceWith('show-all-prior-events', 'false', {
        maxAge: 60 * 60 * 24 * 365,
      });
    });

    it('calls revalidatePath for the events page', async () => {
      await setShowAllPriorEvents(true);
      expect(revalidatePath).toHaveBeenCalledExactlyOnceWith('/adventure/events');
    });
  });
});
