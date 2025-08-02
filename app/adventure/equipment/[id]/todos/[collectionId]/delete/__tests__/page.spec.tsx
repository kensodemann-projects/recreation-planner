import { TODO_COLLECTIONS } from '@/app/adventure/todos/__mocks__/data';
import { canDeleteTodoCollection, fetchTodoCollection } from '@/app/adventure/todos/data';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import DeleteTodoCollectionPage from '../page';

vi.mock('@/app/adventure/todos/data');
vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');

describe('Delete Todo Collection Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('fetches the todo collection', async () => {
      await DeleteTodoCollectionPage({ params: Promise.resolve({ id: '1', collectionId: '3' }) });
      expect(fetchTodoCollection).toHaveBeenCalledExactlyOnceWith(3);
    });

    it('determines if the todo collection can be deleted', async () => {
      await DeleteTodoCollectionPage({ params: Promise.resolve({ id: '1', collectionId: '3' }) });
      expect(canDeleteTodoCollection).toHaveBeenCalledExactlyOnceWith(TODO_COLLECTIONS.find((x) => x.id === 3));
    });

    it('renders the delete todo collection component', async () => {
      const jsx = await DeleteTodoCollectionPage({ params: Promise.resolve({ id: '1', collectionId: '3' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Remove TODO Collection' })).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await DeleteTodoCollectionPage({ params: Promise.resolve({ id: '1', collectionId: '3' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });

    describe('if the todo collection cannot be fetched', () => {
      it('renders an error message', async () => {
        const jsx = await DeleteTodoCollectionPage({ params: Promise.resolve({ id: '1', collectionId: '524' }) });
        render(jsx);
        expect(screen.getByText('Failed to fetch the TODO collection')).toBeDefined();
      });

      it('does not render the delete todo collection component', async () => {
        const jsx = await DeleteTodoCollectionPage({ params: Promise.resolve({ id: '1', collectionId: '524' }) });
        render(jsx);
        expect(screen.queryByRole('heading', { level: 1, name: 'Remove TODO Collection' })).toBeNull();
      });
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
    });

    it('does not fetch the todo collection', async () => {
      await DeleteTodoCollectionPage({ params: Promise.resolve({ id: '1', collectionId: '3' }) });
      expect(fetchTodoCollection).not.toHaveBeenCalled();
    });

    it('does not determine if the todo collection can be deleted', async () => {
      await DeleteTodoCollectionPage({ params: Promise.resolve({ id: '1', collectionId: '3' }) });
      expect(canDeleteTodoCollection).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await DeleteTodoCollectionPage({ params: Promise.resolve({ id: '1', collectionId: '3' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not render the delete todo collection component', async () => {
      const jsx = await DeleteTodoCollectionPage({ params: Promise.resolve({ id: '1', collectionId: '3' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Remove TODO Collection' })).toBeNull();
    });
  });
});
