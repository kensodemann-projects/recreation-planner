import { NOTES } from '@/app/adventure/notes/__mocks__/data';
import { addNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { createConfirmed } from '../actions';

vi.mock('@/app/adventure/notes/data');
vi.mock('next/navigation');

const note: Note = { ...NOTES.find((n) => n.eventRid !== null)!, id: undefined, eventRid: 19 };

describe('event notes: createConfirmed', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls addNote with the specified note', async () => {
    await createConfirmed(note);
    expect(addNote).toHaveBeenCalledExactlyOnceWith(note);
  });

  describe('when addNote succeeds', () => {
    beforeEach(() => {
      (addNote as Mock).mockResolvedValue({ ...note, id: 73 });
    });

    it('redirects to the event details page', async () => {
      await createConfirmed(note);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/events/19?lastActivity=Notes');
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
