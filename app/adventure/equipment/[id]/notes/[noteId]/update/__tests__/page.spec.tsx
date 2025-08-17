import { EQUIPMENT } from '@/app/adventure/equipment/__mocks__/data';
import { fetchEquipment } from '@/app/adventure/equipment/data';
import { NOTES } from '@/app/adventure/notes/__mocks__/data';
import { fetchNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import UpdateNotePage from '../page';

vi.mock('@/utils/supabase/auth');
vi.mock('@/app/adventure/equipment/data');
vi.mock('@/app/adventure/notes/data');
vi.mock('next/navigation');

describe('equipment notes update page', () => {
  const testNote: Note = NOTES.find((x) => x.equipmentRid === 2)!;
  const noteId = testNote.id!.toString();
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('finds a test note', () => {
    expect(testNote).toBeTruthy();
  });

  describe('when logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('fetches the note', async () => {
      await UpdateNotePage({ params: Promise.resolve({ id: '2', noteId }) });
      expect(fetchNote).toHaveBeenCalledExactlyOnceWith(testNote.id);
    });

    it('fetches the equipment using the note RID', async () => {
      await UpdateNotePage({ params: Promise.resolve({ id: '3', noteId }) });
      expect(fetchEquipment).toHaveBeenCalledExactlyOnceWith(testNote.equipmentRid);
    });

    it('renders the page headers', async () => {
      const jsx = await UpdateNotePage({ params: Promise.resolve({ id: '2', noteId }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Update Note' })).toBeDefined();
      expect(
        screen.getByRole('heading', { level: 2, name: `For Equipment: ${EQUIPMENT.find((x) => x.id === 2)!.name}` }),
      ).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await UpdateNotePage({ params: Promise.resolve({ id: '2', noteId }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });

    it('does not renders a fetch failure message', async () => {
      const jsx = await UpdateNotePage({ params: Promise.resolve({ id: '2', noteId }) });
      render(jsx);
      expect(screen.queryByText('Failed to fetch the note')).toBeNull();
    });

    describe('if the note cannot be fetched', () => {
      it('does not fetch the extra data', async () => {
        await UpdateNotePage({ params: Promise.resolve({ id: '2', noteId: '42' }) });
        expect(fetchEquipment).not.toHaveBeenCalled();
      });

      it('renders a simple error message', async () => {
        const jsx = await UpdateNotePage({ params: Promise.resolve({ id: '2', noteId: '42' }) });
        render(jsx);
        expect(screen.getByText('Failed to fetch the note')).toBeDefined();
      });

      it('does not render the page headers', async () => {
        const jsx = await UpdateNotePage({ params: Promise.resolve({ id: '2', noteId: '42' }) });
        render(jsx);
        expect(screen.queryByRole('heading', { level: 1, name: 'Update Note' })).toBeNull();
        expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
      });

      it('does not render the must be logged in component', async () => {
        const jsx = await UpdateNotePage({ params: Promise.resolve({ id: '2', noteId: '42' }) });
        render(jsx);
        expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
      });
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
    });

    it('does not fetch anything', async () => {
      await UpdateNotePage({ params: Promise.resolve({ id: '2', noteId }) });
      expect(fetchNote).not.toHaveBeenCalled();
      expect(fetchEquipment).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await UpdateNotePage({ params: Promise.resolve({ id: '2', noteId }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not render the page headers', async () => {
      const jsx = await UpdateNotePage({ params: Promise.resolve({ id: '2', noteId }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Update Maintenance Event' })).toBeNull();
    });

    it('does not renders a fetch failure message', async () => {
      const jsx = await UpdateNotePage({ params: Promise.resolve({ id: '2', noteId: '42' }) });
      render(jsx);
      expect(screen.queryByText('Failed to fetch the note')).toBeNull();
    });
  });
});
