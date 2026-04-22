import { Note } from '@/models';
import { beforeEach, describe, expect, it, vi } from 'vitest';
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
      await deleteConfirmed(19, note);
      expect(deleteNote).toHaveBeenCalledExactlyOnceWith(note);
    });

    it('redirects to the equipment details page', async () => {
      await deleteConfirmed(19, note);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/equipment/19?lastActivity=Notes');
    });
  });

  describe('deleteAborted', () => {
    it('does not call deleteNote', async () => {
      await deleteAborted(19);
      expect(deleteNote).not.toHaveBeenCalled();
    });

    it('redirects to the equipment details page', async () => {
      await deleteAborted(19);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/equipment/19?lastActivity=Notes');
    });
  });
});
