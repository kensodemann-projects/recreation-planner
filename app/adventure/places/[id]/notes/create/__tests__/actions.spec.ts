import { NOTES } from '@/app/adventure/notes/__mocks__/data';
import { Note } from '@/models';
import { describe, beforeEach, vi, it, expect, type Mock } from 'vitest';
import { createConfirmed } from '../actions';
import { addNote } from '@/app/adventure/notes/data';
import { redirect } from 'next/navigation';

vi.mock('@/app/adventure/notes/data');
vi.mock('next/navigation');

const note: Note = { ...NOTES.find((n) => n.placeRid !== null)!, id: undefined, placeRid: 19 };

describe('place notes: createConfirmed', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls addNote with the specified note', async () => {
    await createConfirmed(note);
    expect(addNote).toHaveBeenCalledExactlyOnceWith(note);
  });

  describe('when addNote succeeds', () => {
    beforeEach(() => {
      (addNote as Mock).mockResolvedValue({ ...note, id: 73 });
    });

    it('redirects to the place details page', async () => {
      await createConfirmed(note);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/places/19');
    });
  });

  describe('when addNote fails', () => {
    beforeEach(() => {
      (addNote as Mock).mockResolvedValue(null);
    });

    it('redirects to /error', async () => {
      await createConfirmed(note);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
