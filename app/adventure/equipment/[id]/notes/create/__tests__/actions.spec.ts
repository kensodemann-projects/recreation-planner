import { addNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { createConfirmed } from '../actions';

vi.mock('@/app/adventure/notes/data');
vi.mock('next/navigation');

const note: Note = {
  name: 'Test Note',
  description: 'A note for testing',
  equipmentRid: 42,
  placeRid: null,
  eventRid: null,
};

describe('equipment note: create', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls addNote with the specified note', async () => {
    await createConfirmed(note);
    expect(addNote).toHaveBeenCalledExactlyOnceWith(note);
  });

  describe('when addNote succeeds', () => {
    beforeEach(() => {
      (addNote as Mock).mockResolvedValue({ ...note, id: 73 });
    });

    it('redirects to the equipment details page', async () => {
      await createConfirmed(note);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/equipment/42?lastActivity=Notes');
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
