import { executeQuery } from '@/utils/data';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { addPlace, canDeletePlace, deletePlace, fetchPlace, fetchPlaces, fetchPlaceTypes, updatePlace } from '../data';

vi.mock('@/utils/supabase/auth');
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

// --- Helpers ---

const buildChainableMock = () => {
  const chain: Record<string, Mock> = {};
  ['select', 'insert', 'update', 'delete', 'eq', 'single', 'order'].forEach((method) => {
    chain[method] = vi.fn().mockReturnValue(chain);
  });
  return chain;
};

// --- Tests ---

describe('places data', () => {
  let mockFrom: Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    const chain = buildChainableMock();
    mockFrom = vi.fn().mockReturnValue(chain);
    vi.mocked(createClient).mockReturnValue({ from: mockFrom } as any);
  });

  // ---------------------------------------------------------------------------
  // fetchPlaces
  // ---------------------------------------------------------------------------

  describe('fetchPlaces', () => {
    describe('when not logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(true);
      });

      it('returns an empty array', async () => {
        expect(await fetchPlaces()).toEqual([]);
      });

      it('does not access the database', async () => {
        await fetchPlaces();
        expect(createClient).not.toHaveBeenCalled();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(false);
      });

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue([placeDTO]);
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
          (executeQuery as Mock).mockResolvedValue(null);
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

  describe('fetchPlace', () => {
    describe('when not logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(true);
      });

      it('returns null', async () => {
        expect(await fetchPlace(1)).toBeNull();
      });

      it('does not access the database', async () => {
        await fetchPlace(1);
        expect(createClient).not.toHaveBeenCalled();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(false);
      });

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(placeDTO);
        });

        it('calls executeQuery', async () => {
          await fetchPlace(1);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the places table', async () => {
          await fetchPlace(1);
          expect(mockFrom).toHaveBeenCalledWith('places');
        });

        it('returns the converted place', async () => {
          expect(await fetchPlace(1)).toEqual(place);
        });
      });

      describe('when full data is requested', () => {
        it('returns the converted place with notes', async () => {
          (executeQuery as Mock).mockResolvedValue(placeWithNotesDTO);
          expect(await fetchPlace(1, true)).toEqual(placeWithNotes);
        });

        it('returns null when no full data is returned', async () => {
          (executeQuery as Mock).mockResolvedValue(null);
          expect(await fetchPlace(1, true)).toBeNull();
        });

        it('throws when full query execution fails', async () => {
          (executeQuery as Mock).mockRejectedValue(new Error('database error'));
          await expect(fetchPlace(1, true)).rejects.toThrow('database error');
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns null', async () => {
          expect(await fetchPlace(1)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // addPlace
  // ---------------------------------------------------------------------------

  describe('addPlace', () => {
    describe('when not logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(true);
      });

      it('returns null', async () => {
        expect(await addPlace(place as any)).toBeNull();
      });

      it('does not access the database', async () => {
        await addPlace(place as any);
        expect(createClient).not.toHaveBeenCalled();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(false);
      });

      describe('when the insert succeeds', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(placeDTO);
        });

        it('calls executeQuery', async () => {
          await addPlace(place as any);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('inserts into the places table', async () => {
          await addPlace(place as any);
          expect(mockFrom).toHaveBeenCalledWith('places');
        });

        it('returns the converted place', async () => {
          expect(await addPlace(place as any)).toEqual(place);
        });
      });

      describe('when the insert fails', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns null', async () => {
          expect(await addPlace(place as any)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // fetchPlaceTypes
  // ---------------------------------------------------------------------------

  describe('fetchPlaceTypes', () => {
    describe('when not logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(true);
      });

      it('returns an empty array', async () => {
        expect(await fetchPlaceTypes()).toEqual([]);
      });

      it('does not access the database', async () => {
        await fetchPlaceTypes();
        expect(createClient).not.toHaveBeenCalled();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(false);
      });

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue([placeTypeDTO]);
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
          (executeQuery as Mock).mockResolvedValue(null);
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
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(true);
      });

      it('returns false', async () => {
        expect(await canDeletePlace(place as any)).toBe(false);
      });

      it('does not access the database', async () => {
        await canDeletePlace(place as any);
        expect(createClient).not.toHaveBeenCalled();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(false);
      });

      it('queries the events table', async () => {
        (executeQuery as Mock).mockResolvedValue({ count: 0 });
        await canDeletePlace(place as any);
        expect(mockFrom).toHaveBeenCalledWith('events');
      });

      describe('when the place is not used in any events', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ count: 0 });
        });

        it('returns true', async () => {
          expect(await canDeletePlace(place as any)).toBe(true);
        });
      });

      describe('when the place is used in one or more events', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ count: 3 });
        });

        it('returns false', async () => {
          expect(await canDeletePlace(place as any)).toBe(false);
        });
      });

      describe('when the query returns no data', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns false', async () => {
          expect(await canDeletePlace(place as any)).toBe(false);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // deletePlace
  // ---------------------------------------------------------------------------

  describe('deletePlace', () => {
    describe('when not logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(true);
      });

      it('does not access the database', async () => {
        await deletePlace(place as any);
        expect(createClient).not.toHaveBeenCalled();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(false);
        (executeQuery as Mock).mockResolvedValue(null);
      });

      it('calls executeQuery', async () => {
        await deletePlace(place as any);
        expect(executeQuery).toHaveBeenCalledOnce();
      });

      it('deletes from the places table', async () => {
        await deletePlace(place as any);
        expect(mockFrom).toHaveBeenCalledWith('places');
      });
    });
  });

  // ---------------------------------------------------------------------------
  // updatePlace
  // ---------------------------------------------------------------------------

  describe('updatePlace', () => {
    describe('when not logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(true);
      });

      it('returns null', async () => {
        expect(await updatePlace(place as any)).toBeNull();
      });

      it('does not access the database', async () => {
        await updatePlace(place as any);
        expect(createClient).not.toHaveBeenCalled();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        (isNotLoggedIn as Mock).mockResolvedValue(false);
      });

      describe('when the update succeeds', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(placeDTO);
        });

        it('calls executeQuery', async () => {
          await updatePlace(place as any);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('updates the places table', async () => {
          await updatePlace(place as any);
          expect(mockFrom).toHaveBeenCalledWith('places');
        });

        it('returns the converted place', async () => {
          expect(await updatePlace(place as any)).toEqual(place);
        });
      });

      describe('when the update fails', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns null', async () => {
          expect(await updatePlace(place as any)).toBeNull();
        });
      });
    });
  });
});
