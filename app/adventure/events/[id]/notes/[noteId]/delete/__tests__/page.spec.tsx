import { NOTES } from '@/app/adventure/notes/__mocks__/data';
import { canDeleteNote, fetchNote } from '@/app/adventure/notes/data';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import DeleteNotePage from '../page';

vi.mock('@/app/adventure/notes/data');
vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');

describe('Delete Note Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('fetches the note', async () => {
      await DeleteNotePage({ params: Promise.resolve({ id: '1', noteId: '3' }) });
      expect(fetchNote).toHaveBeenCalledExactlyOnceWith(3);
    });

    it('determines if the note can be deleted', async () => {
      await DeleteNotePage({ params: Promise.resolve({ id: '1', noteId: '3' }) });
      expect(canDeleteNote).toHaveBeenCalledExactlyOnceWith(NOTES.find((x) => x.id === 3));
    });

    it('renders the delete note component', async () => {
      const jsx = await DeleteNotePage({ params: Promise.resolve({ id: '1', noteId: '3' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Remove Note' })).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await DeleteNotePage({ params: Promise.resolve({ id: '1', noteId: '3' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });

    describe('if the note cannot be fetched', () => {
      it('renders an error message', async () => {
        const jsx = await DeleteNotePage({ params: Promise.resolve({ id: '1', noteId: '524' }) });
        render(jsx);
        expect(screen.getByText('Failed to fetch the note')).toBeDefined();
      });

      it('does not render the delete note component', async () => {
        const jsx = await DeleteNotePage({ params: Promise.resolve({ id: '1', noteId: '524' }) });
        render(jsx);
        expect(screen.queryByRole('heading', { level: 1, name: 'Remove Note' })).toBeNull();
      });
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
    });

    it('does not fetch the note', async () => {
      await DeleteNotePage({ params: Promise.resolve({ id: '1', noteId: '3' }) });
      expect(fetchNote).not.toHaveBeenCalled();
    });

    it('does not determine if the note can be deleted', async () => {
      await DeleteNotePage({ params: Promise.resolve({ id: '1', noteId: '3' }) });
      expect(canDeleteNote).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await DeleteNotePage({ params: Promise.resolve({ id: '1', noteId: '3' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not render the delete note component', async () => {
      const jsx = await DeleteNotePage({ params: Promise.resolve({ id: '1', noteId: '3' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Remove Note' })).toBeNull();
    });
  });
});
