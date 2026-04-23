import { NOTES } from '@/app/adventure/notes/__mocks__/data';
import { deleteNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { deleteAborted, deleteConfirmed } from '../actions';

vi.mock('@/app/adventure/notes/data');
vi.mock('next/navigation');

const note: Note = NOTES.find((n) => n.eventRid !== null)!;

describe('event notes: delete actions', () => {
  beforeEach(() => vi.clearAllMocks());

  describe('deleteConfirmed', () => {
    it('calls deleteNote', async () => {
      await deleteConfirmed(19, note);
      expect(deleteNote).toHaveBeenCalledExactlyOnceWith(note);
    });

    it('redirects to the event details page', async () => {
      await deleteConfirmed(19, note);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/events/19?lastActivity=Notes');
    });
  });

  describe('deleteAborted', () => {
    it('does not call deleteNote', async () => {
      await deleteAborted(19);
      expect(deleteNote).not.toHaveBeenCalled();
    });

    it('redirects to the event details page', async () => {
      await deleteAborted(19);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/events/19?lastActivity=Notes');
    });
  });
});
