import { Place } from '@/models';
import { PLACES } from '@/app/adventure/places/__mocks__/data';
import { redirect } from 'next/navigation';
import { describe, beforeEach, vi, it, expect, type Mock } from 'vitest';
import { deleteConfirmed, deleteAborted } from '../actions';
import { deletePlace } from '@/app/adventure/places/data';

vi.mock('@/app/adventure/places/data');
vi.mock('next/navigation');

const place: Place = PLACES.find((p) => p.id === 2)!;

describe('places: delete actions', () => {
  beforeEach(() => vi.clearAllMocks());

  describe('deleteConfirmed', () => {
    it('calls deletePlace', async () => {
      await deleteConfirmed(place).catch(() => {});
      expect(deletePlace).toHaveBeenCalledExactlyOnceWith(place);
    });

    it('redirects to the places list page if the delete succeeds', async () => {
      (deletePlace as Mock).mockResolvedValue(true);
      await deleteConfirmed(place).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/places');
    });

    it('redirects to /error if the delete fails', async () => {
      (deletePlace as Mock).mockResolvedValue(false);
      await deleteConfirmed(place).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });

  describe('deleteAborted', () => {
    it('does not call deletePlace', async () => {
      await deleteAborted().catch(() => {});
      expect(deletePlace).not.toHaveBeenCalled();
    });

    it('redirects to the places list page', async () => {
      await deleteAborted().catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/places');
    });
  });
});
