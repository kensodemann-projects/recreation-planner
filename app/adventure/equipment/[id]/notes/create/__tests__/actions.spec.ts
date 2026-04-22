import { Note } from '@/models';
import { createConfirmed } from '../actions';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { addNote } from '@/app/adventure/notes/data';
import { redirect } from 'next/navigation';

vi.mock('@/app/adventure/notes/data');
vi.mock('next/navigation');

const note: Note = {
  name: 'Test Note',
  description: 'A note for testing',
  equipmentRid: 42,
  placeRid: null,
  eventRid: null,
};

describe('eqipment note: create', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls addNote with the specified note', async () => {
    await createConfirmed(note);
    expect(addNote).toHaveBeenCalledExactlyOnceWith(note);
  });

  describe('when addNote succeeds', () => {
    beforeEach(() => {
      (addNote as any).mockResolvedValue({ ...note, id: 73 });
    });

    it('redirects to the equipment details page', async () => {
      await createConfirmed(note);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/equipment/42?lastActivity=Notes');
    });
  });

  describe('when addNote fails', () => {
    beforeEach(() => {
      (addNote as any).mockResolvedValue(null);
    });

    it('redirects to /error', async () => {
      await createConfirmed(note);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
