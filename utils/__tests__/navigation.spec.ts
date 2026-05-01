import { redirect } from 'next/navigation';
import { vi, describe, expect, it, beforeEach } from 'vitest';
import { redirectToDetails } from '../navigation';

vi.mock('next/navigation');

describe('navigation utils', () => {
  beforeEach(() => vi.clearAllMocks());

  describe('redirect to detail', () => {
    it('redirects to the correct path', () => {
      redirectToDetails('events', 123);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/events/123');
    });

    it('redirects to the correct path for a place', () => {
      redirectToDetails('places', 456);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/places/456');
    });

    it('includes the active tab', () => {
      redirectToDetails('events', 334, 'itinerary');
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/events/334?lastActivity=itinerary');
    });
  });
});
