import { fetchTodoCollection } from '@/app/adventure/todos/data';
import { isLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import UpdateTodoCollectionPage from '../page';

vi.mock('@/app/adventure/events/data');
vi.mock('@/app/adventure/todos/data');
vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');

describe('Update Todo Collection Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(true);
    });

    it('fetches the collection', async () => {
      await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '3', collectionId: '56' }) });
      expect(fetchTodoCollection).toHaveBeenCalledExactlyOnceWith(56);
    });

    it('renders the update todo collection component', async () => {
      const jsx = await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '3', collectionId: '56' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Update the Todo Collection' })).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '3', collectionId: '56' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(false);
    });

    it('does not fetch anything', async () => {
      await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '3', collectionId: '56' }) });
      expect(fetchTodoCollection).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '3', collectionId: '56' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not render the update todo collection component', async () => {
      const jsx = await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '3', collectionId: '56' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Update the Todo Collection' })).toBeNull();
    });
  });
});
