import { Place } from '@/models';
import { PLACES } from '@/app/adventure/places/__mocks__/data';
import { createConfirmed } from '../actions';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { addPlace } from '@/app/adventure/places/data';
import { redirect } from 'next/navigation';

vi.mock('@/app/adventure/places/data');
vi.mock('next/navigation');

const place: Place = { ...PLACES.find((p) => p.id === 2)!, id: undefined };

describe('places: createConfirmed', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls addPlace with the specified place', async () => {
    await createConfirmed(place);
    expect(addPlace).toHaveBeenCalledExactlyOnceWith(place);
  });

  describe('on success', () => {
    beforeEach(() => {
      (addPlace as any).mockResolvedValue({ ...place, id: 73 });
    });

    it('redirects to the places page', async () => {
      await createConfirmed(place);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/places');
    });
  });

  describe('on failure', () => {
    beforeEach(() => {
      (addPlace as any).mockResolvedValue(null);
    });

    it('redirects to the error page', async () => {
      await createConfirmed(place);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
