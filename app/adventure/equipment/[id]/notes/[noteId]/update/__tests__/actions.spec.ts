import { updateNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { updateConfirmed } from '../actions';

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

describe('equipment notes: updateConfirmed', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls updateNote with the specified note', async () => {
    await updateConfirmed(note);
    expect(updateNote).toHaveBeenCalledExactlyOnceWith(note);
  });

  describe('when the update succeeds', () => {
    beforeEach(() => {
      (updateNote as any).mockResolvedValue(note);
    });

    it('redirects to the equipment details page', async () => {
      await updateConfirmed(note);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/equipment/42?lastActivity=Notes');
    });
  });

  describe('when the update fails', () => {
    beforeEach(() => {
      (updateNote as any).mockResolvedValue(null);
    });

    it('redirects to /error', async () => {
      await updateConfirmed(note);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
