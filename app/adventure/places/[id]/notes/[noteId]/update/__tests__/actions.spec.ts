import { NOTES } from '@/app/adventure/notes/__mocks__/data';
import { updateNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { updateConfirmed } from '../actions';

vi.mock('@/app/adventure/notes/data');
vi.mock('next/navigation');

const note: Note = { ...NOTES.find((n) => n.placeRid !== null)!, placeRid: 14 };

describe('place notes: updateConfirmed', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls updateNote with the specified note', async () => {
    await updateConfirmed(note);
    expect(updateNote).toHaveBeenCalledExactlyOnceWith(note);
  });

  describe('when updateNote succeeds', () => {
    beforeEach(() => {
      (updateNote as Mock).mockResolvedValue(note);
    });

    it('redirects to the place details page', async () => {
      await updateConfirmed(note);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/places/14');
    });
  });

  describe('when updateNote fails', () => {
    beforeEach(() => {
      (updateNote as Mock).mockResolvedValue(null);
    });

    it('redirects to /error', async () => {
      await updateConfirmed(note);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
