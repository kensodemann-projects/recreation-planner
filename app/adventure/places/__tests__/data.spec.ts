import { buildChainableMock, setLoggedIn, setLoggedOut } from '@/test-utils/data-helpers';
import { executeQuery } from '@/utils/data';
import { createClient } from '@/utils/supabase/server';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { addPlace, canDeletePlace, deletePlace, fetchPlace, fetchPlaces, fetchPlaceTypes, updatePlace } from '../data';

vi.mock('@/utils/supabase/server');
vi.mock('@/utils/data', () => ({ executeQuery: vi.fn() }));

// --- Test data ---

const placeTypeDTO = { id: 3, name: 'Campground', description: 'A place to camp' };

const placeDTO = {
  id: 1,
  name: 'Test Campground',
  description: 'A test campground',
  address_line_1: '123 Main St',
  address_line_2: null,
  city: 'Anytown',
  state: 'CA',
  postal_code: '12345',
  phone_number: '555-555-5555',
  website: 'https://example.com',
  place_type_rid: 3,
  place_types: placeTypeDTO,
};

const placeWithNotesDTO = {
  ...placeDTO,
  notes: [
    {
      id: 8,
      name: 'Bring firewood',
      description: 'Check local restrictions',
      place_rid: 1,
      equipment_rid: null,
      event_rid: null,
    },
  ],
};

const place = {
  id: 1,
  name: 'Test Campground',
  description: 'A test campground',
  address: {
    line1: '123 Main St',
    line2: null,
    city: 'Anytown',
    state: 'CA',
    postal: '12345',
  },
  phoneNumber: '555-555-5555',
  website: 'https://example.com',
  type: { id: 3, name: 'Campground', description: 'A place to camp' },
};

const placeWithNotes = {
  ...place,
  notes: [
    {
      id: 8,
      name: 'Bring firewood',
      description: 'Check local restrictions',
      placeRid: 1,
      equipmentRid: null,
      eventRid: null,
    },
  ],
};

// --- Tests ---

describe('places data', () => {
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
  // fetchPlaces
  // ---------------------------------------------------------------------------

  describe('fetchPlaces', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns an empty array', async () => {
        expect(await fetchPlaces()).toEqual([]);
      });

      it('does not access the database', async () => {
        await fetchPlaces();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: true, data: [placeDTO] });
        });

        it('calls executeQuery', async () => {
          await fetchPlaces();
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the places table', async () => {
          await fetchPlaces();
          expect(mockFrom).toHaveBeenCalledWith('places');
        });

        it('returns the converted places list', async () => {
          expect(await fetchPlaces()).toEqual([place]);
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'NOT_FOUND' });
        });

        it('returns an empty array', async () => {
          expect(await fetchPlaces()).toEqual([]);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // fetchPlace
  // ---------------------------------------------------------------------------

  describe.each([true, false])('fetchPlace full: $0', (full: boolean) => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns null', async () => {
        expect(await fetchPlace(1, full)).toBeNull();
      });

      it('does not access the database', async () => {
        await fetchPlace(1, full);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(
            full ? { success: true, data: placeWithNotesDTO } : { success: true, data: placeDTO },
          );
        });

        it('calls executeQuery', async () => {
          await fetchPlace(1, full);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the places table', async () => {
          await fetchPlace(1, full);
          expect(mockFrom).toHaveBeenCalledWith('places');
        });

        it('returns the converted place', async () => {
          expect(await fetchPlace(1, full)).toEqual(full ? placeWithNotes : place);
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'NOT_FOUND' });
        });

        it('returns null', async () => {
          expect(await fetchPlace(1, full)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // addPlace
  // ---------------------------------------------------------------------------

  describe('addPlace', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns null', async () => {
        expect(await addPlace(place)).toBeNull();
      });

      it('does not access the database', async () => {
        await addPlace(place);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when the insert succeeds', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: true, data: placeDTO });
        });

        it('calls executeQuery', async () => {
          await addPlace(place);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('inserts into the places table', async () => {
          await addPlace(place);
          expect(mockFrom).toHaveBeenCalledWith('places');
        });

        it('returns the converted place', async () => {
          expect(await addPlace(place)).toEqual(place);
        });
      });

      describe('when the insert fails', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'SERVER_ERROR' });
        });

        it('returns null', async () => {
          expect(await addPlace(place)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // fetchPlaceTypes
  // ---------------------------------------------------------------------------

  describe('fetchPlaceTypes', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns an empty array', async () => {
        expect(await fetchPlaceTypes()).toEqual([]);
      });

      it('does not access the database', async () => {
        await fetchPlaceTypes();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: true, data: [placeTypeDTO] });
        });

        it('calls executeQuery', async () => {
          await fetchPlaceTypes();
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the place_types table', async () => {
          await fetchPlaceTypes();
          expect(mockFrom).toHaveBeenCalledWith('place_types');
        });

        it('returns the place types', async () => {
          expect(await fetchPlaceTypes()).toEqual([{ id: 3, name: 'Campground', description: 'A place to camp' }]);
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'SERVER_ERROR' });
        });

        it('returns an empty array', async () => {
          expect(await fetchPlaceTypes()).toEqual([]);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // canDeletePlace
  // ---------------------------------------------------------------------------

  describe('canDeletePlace', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns false', async () => {
        expect(await canDeletePlace(place)).toBe(false);
      });

      it('does not access the database', async () => {
        await canDeletePlace(place);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      it('queries the events table', async () => {
        (executeQuery as Mock).mockResolvedValue({ success: true, data: { count: 0 } });
        await canDeletePlace(place);
        expect(mockFrom).toHaveBeenCalledWith('events');
      });

      describe('when the place is not used in any events', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: true, data: { count: 0 } });
        });

        it('returns true', async () => {
          expect(await canDeletePlace(place)).toBe(true);
        });
      });

      describe('when the place is used in one or more events', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: true, data: { count: 3 } });
        });

        it('returns false', async () => {
          expect(await canDeletePlace(place)).toBe(false);
        });
      });

      describe('when the query returns no data', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'SERVER_ERROR' });
        });

        it('returns false', async () => {
          expect(await canDeletePlace(place)).toBe(false);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // deletePlace
  // ---------------------------------------------------------------------------

  describe('deletePlace', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('does not access the database', async () => {
        await deletePlace(place);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        setLoggedIn();
        (executeQuery as Mock).mockResolvedValue({ success: true, data: null });
      });

      it('calls executeQuery', async () => {
        await deletePlace(place);
        expect(executeQuery).toHaveBeenCalledOnce();
      });

      it('deletes from the places table', async () => {
        await deletePlace(place);
        expect(mockFrom).toHaveBeenCalledWith('places');
      });
    });
  });

  // ---------------------------------------------------------------------------
  // updatePlace
  // ---------------------------------------------------------------------------

  describe('updatePlace', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns null', async () => {
        expect(await updatePlace(place)).toBeNull();
      });

      it('does not access the database', async () => {
        await updatePlace(place);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when the update succeeds', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: true, data: placeDTO });
        });

        it('calls executeQuery', async () => {
          await updatePlace(place);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('updates the places table', async () => {
          await updatePlace(place);
          expect(mockFrom).toHaveBeenCalledWith('places');
        });

        it('returns the converted place', async () => {
          expect(await updatePlace(place)).toEqual(place);
        });
      });

      describe('when the update fails', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'SERVER_ERROR' });
        });

        it('returns null', async () => {
          expect(await updatePlace(place)).toBeNull();
        });
      });
    });
  });
});
