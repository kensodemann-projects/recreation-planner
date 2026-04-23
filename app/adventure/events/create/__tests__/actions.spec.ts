import { Event, Place } from '@/models';
import { EVENTS } from '@/app/adventure/events/__mocks__/data';
import { describe, beforeEach, vi, it, expect } from 'vitest';
import type { Mock } from 'vitest';
import { createConfirmed } from '../actions';
import { addEvent } from '@/app/adventure/events/data';
import { addPlace, fetchPlaceTypes } from '@/app/adventure/places/data';
import { PLACE_TYPES } from '@/app/adventure/places/__mocks__/data';
import { redirect } from 'next/navigation';

vi.mock('@/app/adventure/events/data');
vi.mock('@/app/adventure/places/data');
vi.mock('next/navigation');

const event: Event = { ...EVENTS.find((e) => e.id === 1)!, id: undefined };
const place: Place = {
  name: `Edit Me for: ${event.name}`,
  description: null,
  type: PLACE_TYPES[0],
  website: null,
  phoneNumber: null,
  address: {
    line1: null,
    line2: null,
    city: null,
    state: null,
    postal: null,
  },
};

describe('events: createConfirmed', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls addEvent with the specified event', async () => {
    await createConfirmed(event);
    expect(addEvent).toHaveBeenCalledExactlyOnceWith(event);
    expect(addPlace).not.toHaveBeenCalled();
    expect(fetchPlaceTypes).not.toHaveBeenCalled();
  });

  it('adds a placeholder place if a place on the event is a fake that needs to be created', async () => {
    const eventWithoutPlace = { ...event, place: { ...event.place, id: -1 } };
    (fetchPlaceTypes as Mock).mockResolvedValue(PLACE_TYPES);
    (addPlace as Mock).mockResolvedValue({ ...place, id: 420 });

    await createConfirmed(eventWithoutPlace);
    expect(fetchPlaceTypes).toHaveBeenCalledExactlyOnceWith();
    expect(addPlace).toHaveBeenCalledExactlyOnceWith(place);
    expect(addEvent).toHaveBeenCalledExactlyOnceWith({ ...eventWithoutPlace, place: { ...place, id: 420 } });
  });

  describe('when addEvent succeeds', () => {
    beforeEach(() => {
      (addEvent as any).mockResolvedValue({ ...event, id: 73 });
    });

    it('redirects to the events list page', async () => {
      await createConfirmed(event);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/events');
    });
  });

  describe('when addEvent fails', () => {
    beforeEach(() => {
      (addEvent as any).mockResolvedValue(null);
    });

    it('redirects to /error', async () => {
      await createConfirmed(event);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
