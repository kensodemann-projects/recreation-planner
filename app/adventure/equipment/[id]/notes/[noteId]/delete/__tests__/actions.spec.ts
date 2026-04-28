import { Note } from '@/models';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { deleteAborted, deleteConfirmed } from '../actions';
import { deleteNote } from '@/app/adventure/notes/data';
import { redirect } from 'next/navigation';

vi.mock('@/app/adventure/notes/data');
vi.mock('next/navigation');

const note: Note = {
  id: 73,
  name: 'Test Note',
  description: 'A note for testing',
  equipmentRid: 42,
  placeRid: null,
  eventRid: null,
};

describe('equipment notes: delete actions', () => {
  beforeEach(() => vi.clearAllMocks());

  describe('deleteConfirmed', () => {
    it('calls deleteNote', async () => {
      await deleteConfirmed(19, note).catch(() => {});
      expect(deleteNote).toHaveBeenCalledExactlyOnceWith(note);
    });

    it('redirects to the equipment details page if the delete succeeds', async () => {
      (deleteNote as Mock).mockResolvedValue(true);
      await deleteConfirmed(19, note).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/equipment/19?lastActivity=Notes');
    });

    it('redirects to /error if the delete fails', async () => {
      (deleteNote as Mock).mockResolvedValue(false);
      await deleteConfirmed(19, note).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });

  describe('deleteAborted', () => {
    it('does not call deleteNote', async () => {
      await deleteAborted(19).catch(() => {});
      expect(deleteNote).not.toHaveBeenCalled();
    });

    it('redirects to the equipment details page', async () => {
      await deleteAborted(19).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/equipment/19?lastActivity=Notes');
    });
  });
});
