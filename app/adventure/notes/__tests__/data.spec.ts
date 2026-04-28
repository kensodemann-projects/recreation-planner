import { buildChainableMock, setLoggedIn, setLoggedOut } from '@/test-utils/data-helpers';
import { executeQuery } from '@/utils/data';
import { createClient } from '@/utils/supabase/server';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { addNote, canDeleteNote, deleteNote, fetchNote, updateNote } from '../data';

vi.mock('@/utils/supabase/server');
vi.mock('@/utils/data', () => ({ executeQuery: vi.fn() }));

// --- Test data ---

const noteDTO = {
  id: 1,
  name: 'Parking info',
  description: 'Park in Lot 17, free after 5pm.',
  equipment_rid: null,
  event_rid: 4,
  place_rid: null,
};

const note = {
  id: 1,
  name: 'Parking info',
  description: 'Park in Lot 17, free after 5pm.',
  equipmentRid: null,
  eventRid: 4,
  placeRid: null,
};

// --- Tests ---

describe('notes data', () => {
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
  // fetchNote
  // ---------------------------------------------------------------------------

  describe('fetchNote', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns null', async () => {
        expect(await fetchNote(1)).toBeNull();
      });

      it('does not access the database', async () => {
        await fetchNote(1);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: true, data: noteDTO });
        });

        it('calls executeQuery', async () => {
          await fetchNote(1);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the notes table', async () => {
          await fetchNote(1);
          expect(mockFrom).toHaveBeenCalledWith('notes');
        });

        it('returns the converted note', async () => {
          expect(await fetchNote(1)).toEqual(note);
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'NOT_FOUND' });
        });

        it('returns null', async () => {
          expect(await fetchNote(1)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // addNote
  // ---------------------------------------------------------------------------

  describe('addNote', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns null', async () => {
        expect(await addNote(note)).toBeNull();
      });

      it('does not access the database', async () => {
        await addNote(note);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when the insert succeeds', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: true, data: noteDTO });
        });

        it('calls executeQuery', async () => {
          await addNote(note);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('inserts into the notes table', async () => {
          await addNote(note);
          expect(mockFrom).toHaveBeenCalledWith('notes');
        });

        it('returns the converted note', async () => {
          expect(await addNote(note)).toEqual(note);
        });
      });

      describe('when the insert fails', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'SERVER_ERROR' });
        });

        it('returns null', async () => {
          expect(await addNote(note)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // canDeleteNote
  // ---------------------------------------------------------------------------

  describe('canDeleteNote', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns false', async () => {
        expect(await canDeleteNote(note)).toBe(false);
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      it('returns true', async () => {
        expect(await canDeleteNote(note)).toBe(true);
      });
    });
  });

  // ---------------------------------------------------------------------------
  // deleteNote
  // ---------------------------------------------------------------------------

  describe('deleteNote', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns false', async () => {
        expect(await deleteNote(note)).toBe(false);
      });

      it('does not access the database', async () => {
        await deleteNote(note);
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
          await deleteNote(note);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('deletes from the notes table', async () => {
          await deleteNote(note);
          expect(mockFrom).toHaveBeenCalledWith('notes');
        });

        it('returns true', async () => {
          expect(await deleteNote(note)).toBe(true);
        });
      });

      describe('when the delete fails', () => {
        beforeEach(() => {
          setLoggedIn();
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'SERVER_ERROR' });
        });

        it('returns false', async () => {
          expect(await deleteNote(note)).toBe(false);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // updateNote
  // ---------------------------------------------------------------------------

  describe('updateNote', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns null', async () => {
        expect(await updateNote(note)).toBeNull();
      });

      it('does not access the database', async () => {
        await updateNote(note);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when the update succeeds', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: true, data: noteDTO });
        });

        it('calls executeQuery', async () => {
          await updateNote(note);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('updates the notes table', async () => {
          await updateNote(note);
          expect(mockFrom).toHaveBeenCalledWith('notes');
        });

        it('returns the converted note', async () => {
          expect(await updateNote(note)).toEqual(note);
        });
      });

      describe('when the update fails', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue({ success: false, error: 'SERVER_ERROR' });
        });

        it('returns null', async () => {
          expect(await updateNote(note)).toBeNull();
        });
      });
    });
  });
});
