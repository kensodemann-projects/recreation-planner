import { executeQuery } from '@/utils/data';
import { createClient } from '@/utils/supabase/server';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import {
  addEvent,
  canDeleteEvent,
  deleteEvent,
  fetchEvent,
  fetchEventTypes,
  fetchLatestEvents,
  fetchPriorEvents,
  fetchUpcomingEvents,
  updateEvent,
} from '../data';
import { buildChainableMock, setLoggedIn, setLoggedOut } from '@/test-utils/data-helpers';

vi.mock('@/utils/supabase/server');
vi.mock('@/utils/data', () => ({ executeQuery: vi.fn() }));

// --- Test data ---

const placeTypeDTO = { id: 3, name: 'Sports Arena', description: 'Go sports!!' };

const placeDTO = {
  id: 4,
  name: 'LaBahn Arena',
  description: null,
  address_line_1: '105 East Campus Mall',
  address_line_2: null,
  city: 'Madison',
  state: 'WI',
  postal_code: '53715',
  phone_number: null,
  website: null,
  place_type_rid: 3,
  place_types: placeTypeDTO,
};

const eventTypeDTO = {
  id: 2,
  name: 'Sporting Event',
  description: 'The primary purpose of the activity is to view a competition.',
};

const eventDTO = {
  id: 1,
  name: "Women's Hockey Tournament",
  description: 'A three day long tournament of women playing hockey',
  begin_date: '2024-09-28',
  begin_time: '18:30',
  end_date: '2024-09-30',
  end_time: '22:30',
  place_rid: 4,
  event_type_rid: 2,
  places: placeDTO,
  event_types: eventTypeDTO,
};

const event = {
  id: 1,
  name: "Women's Hockey Tournament",
  description: 'A three day long tournament of women playing hockey',
  beginDate: '2024-09-28',
  beginTime: '18:30',
  endDate: '2024-09-30',
  endTime: '22:30',
  place: {
    id: 4,
    name: 'LaBahn Arena',
    description: null,
    address: {
      line1: '105 East Campus Mall',
      line2: null,
      city: 'Madison',
      state: 'WI',
      postal: '53715',
    },
    phoneNumber: null,
    website: null,
    type: { id: 3, name: 'Sports Arena', description: 'Go sports!!' },
  },
  type: { id: 2, name: 'Sporting Event', description: 'The primary purpose of the activity is to view a competition.' },
  itinerary: undefined,
  notes: undefined,
  todoCollections: undefined,
};

// --- Tests ---

describe('events data', () => {
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
  // fetchUpcomingEvents
  // ---------------------------------------------------------------------------

  describe('fetchUpcomingEvents', () => {
    describe('when not logged in', () => {
      beforeEach(setLoggedOut);

      it('returns an empty array', async () => {
        expect(await fetchUpcomingEvents('2024-01-01')).toEqual([]);
      });

      it('does not access the database', async () => {
        await fetchUpcomingEvents('2024-01-01');
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(setLoggedIn);

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: true, data: [eventDTO] });
        });

        it('calls executeQuery', async () => {
          await fetchUpcomingEvents('2024-01-01');
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the events table', async () => {
          await fetchUpcomingEvents('2024-01-01');
          expect(mockFrom).toHaveBeenCalledWith('events');
        });

        it('returns the converted events list', async () => {
          expect(await fetchUpcomingEvents('2024-01-01')).toEqual([event]);
        });

        it('also queries the events table when an end date is provided', async () => {
          await fetchUpcomingEvents('2024-01-01', '2024-12-31');
          expect(mockFrom).toHaveBeenCalledWith('events');
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'NOT_FOUND' });
        });

        it('returns an empty array', async () => {
          expect(await fetchUpcomingEvents('2024-01-01')).toEqual([]);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // fetchPriorEvents
  // ---------------------------------------------------------------------------

  describe('fetchPriorEvents', () => {
    describe('when not logged in', () => {
      beforeEach(setLoggedOut);

      it('returns an empty array', async () => {
        expect(await fetchPriorEvents('2024-01-01')).toEqual([]);
      });

      it('does not access the database', async () => {
        await fetchPriorEvents('2024-01-01');
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(setLoggedIn);

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: true, data: [eventDTO] });
        });

        it('calls executeQuery', async () => {
          await fetchPriorEvents('2024-01-01');
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the events table', async () => {
          await fetchPriorEvents('2024-01-01');
          expect(mockFrom).toHaveBeenCalledWith('events');
        });

        it('returns the converted events list', async () => {
          expect(await fetchPriorEvents('2024-01-01')).toEqual([event]);
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'NOT_FOUND' });
        });

        it('returns an empty array', async () => {
          expect(await fetchPriorEvents('2024-01-01')).toEqual([]);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // fetchLatestEvents
  // ---------------------------------------------------------------------------

  describe('fetchLatestEvents', () => {
    describe('when not logged in', () => {
      beforeEach(setLoggedOut);

      it('returns an empty array', async () => {
        expect(await fetchLatestEvents(5)).toEqual([]);
      });

      it('does not access the database', async () => {
        await fetchLatestEvents(5);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(setLoggedIn);

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: true, data: [eventDTO] });
        });

        it('calls executeQuery', async () => {
          await fetchLatestEvents(5);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the events table', async () => {
          await fetchLatestEvents(5);
          expect(mockFrom).toHaveBeenCalledWith('events');
        });

        it('returns the converted events list', async () => {
          expect(await fetchLatestEvents(5)).toEqual([event]);
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'NOT_FOUND' });
        });

        it('returns an empty array', async () => {
          expect(await fetchLatestEvents(5)).toEqual([]);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // fetchEvent
  // ---------------------------------------------------------------------------

  describe('fetchEvent', () => {
    describe('when not logged in', () => {
      beforeEach(setLoggedOut);

      it('returns null', async () => {
        expect(await fetchEvent(1)).toBeNull();
      });

      it('does not access the database', async () => {
        await fetchEvent(1);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(setLoggedIn);

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: true, data: eventDTO });
        });

        it('calls executeQuery', async () => {
          await fetchEvent(1);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the events table', async () => {
          await fetchEvent(1);
          expect(mockFrom).toHaveBeenCalledWith('events');
        });

        it('returns the converted event', async () => {
          expect(await fetchEvent(1)).toEqual(event);
        });

        describe('when fetching the full event', () => {
          it('queries the events table', async () => {
            await fetchEvent(1, true);
            expect(mockFrom).toHaveBeenCalledWith('events');
          });

          it('returns the converted event', async () => {
            expect(await fetchEvent(1, true)).toEqual(event);
          });
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'NOT_FOUND' });
        });

        it('returns null', async () => {
          expect(await fetchEvent(1)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // addEvent
  // ---------------------------------------------------------------------------

  describe('addEvent', () => {
    describe('when not logged in', () => {
      beforeEach(setLoggedOut);

      it('returns null', async () => {
        expect(await addEvent(event)).toBeNull();
      });

      it('does not access the database', async () => {
        await addEvent(event);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(setLoggedIn);

      describe('when the insert succeeds', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: true, data: eventDTO });
        });

        it('calls executeQuery', async () => {
          await addEvent(event);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('inserts into the events table', async () => {
          await addEvent(event);
          expect(mockFrom).toHaveBeenCalledWith('events');
        });

        it('returns the converted event', async () => {
          expect(await addEvent(event)).toEqual(event);
        });
      });

      describe('when the insert fails', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'SERVER_ERROR' });
        });

        it('returns null', async () => {
          expect(await addEvent(event)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // canDeleteEvent
  // ---------------------------------------------------------------------------

  describe('canDeleteEvent', () => {
    describe('when not logged in', () => {
      beforeEach(setLoggedOut);

      it('returns false', async () => {
        expect(await canDeleteEvent(event)).toBe(false);
      });
    });

    describe('when logged in', () => {
      beforeEach(setLoggedIn);

      it('returns true', async () => {
        expect(await canDeleteEvent(event)).toBe(true);
      });
    });
  });

  // ---------------------------------------------------------------------------
  // deleteEvent
  // ---------------------------------------------------------------------------

  describe('deleteEvent', () => {
    describe('when not logged in', () => {
      beforeEach(setLoggedOut);

      it('returns false', async () => {
        expect(await deleteEvent(event)).toBe(false);
      });

      it('does not access the database', async () => {
        await deleteEvent(event);
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
          await deleteEvent(event);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('deletes from the events table', async () => {
          await deleteEvent(event);
          expect(mockFrom).toHaveBeenCalledWith('events');
        });

        it('returns true', async () => {
          expect(await deleteEvent(event)).toBe(true);
        });
      });

      describe('when the delete fails', () => {
        beforeEach(() => {
          setLoggedIn();
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'SERVER_ERROR' });
        });

        it('returns false', async () => {
          expect(await deleteEvent(event)).toBe(false);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // fetchEventTypes
  // ---------------------------------------------------------------------------

  describe('fetchEventTypes', () => {
    describe('when not logged in', () => {
      beforeEach(setLoggedOut);

      it('returns an empty array', async () => {
        expect(await fetchEventTypes()).toEqual([]);
      });

      it('does not access the database', async () => {
        await fetchEventTypes();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(setLoggedIn);

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: true, data: [eventTypeDTO] });
        });

        it('calls executeQuery', async () => {
          await fetchEventTypes();
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the event_types table', async () => {
          await fetchEventTypes();
          expect(mockFrom).toHaveBeenCalledWith('event_types');
        });

        it('returns the event types', async () => {
          expect(await fetchEventTypes()).toEqual([eventTypeDTO]);
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'SERVER_ERROR' });
        });

        it('returns an empty array', async () => {
          expect(await fetchEventTypes()).toEqual([]);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // updateEvent
  // ---------------------------------------------------------------------------

  describe('updateEvent', () => {
    describe('when not logged in', () => {
      beforeEach(setLoggedOut);

      it('returns null', async () => {
        expect(await updateEvent(event)).toBeNull();
      });

      it('does not access the database', async () => {
        await updateEvent(event);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(setLoggedIn);

      describe('when the update succeeds', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: true, data: eventDTO });
        });

        it('calls executeQuery', async () => {
          await updateEvent(event);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('updates the events table', async () => {
          await updateEvent(event);
          expect(mockFrom).toHaveBeenCalledWith('events');
        });

        it('returns the converted event', async () => {
          expect(await updateEvent(event)).toEqual(event);
        });
      });

      describe('when the update fails', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'SERVER_ERROR' });
        });

        it('returns null', async () => {
          expect(await updateEvent(event)).toBeNull();
        });
      });
    });
  });
});
