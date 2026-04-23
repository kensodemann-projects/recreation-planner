import { PLACES } from '@/app/adventure/places/__mocks__/data';
import { updatePlace } from '@/app/adventure/places/data';
import { Place } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { updateConfirmed } from '../actions';

vi.mock('@/app/adventure/places/data');
vi.mock('next/navigation');

const place: Place = PLACES.find((p) => p.id === 2)!;

describe('places: updateConfirmed', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls updatePlace with the specified place', async () => {
    await updateConfirmed(place);
    expect(updatePlace).toHaveBeenCalledExactlyOnceWith(place);
  });

  describe('when the update succeeds', () => {
    beforeEach(() => {
      (updatePlace as Mock).mockResolvedValue(place);
    });

    it('redirects to the places list page', async () => {
      await updateConfirmed(place);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/places');
    });
  });

  describe('when the update fails', () => {
    beforeEach(() => {
      (updatePlace as Mock).mockResolvedValue(null);
    });

    it('redirects to /error', async () => {
      await updateConfirmed(place);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
