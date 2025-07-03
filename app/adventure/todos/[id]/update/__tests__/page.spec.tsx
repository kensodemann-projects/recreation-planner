import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { fetchTodoCollection } from '../../../data';
import UpdateTodoCollectionPage from '../page';

vi.mock('../../../data');
vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');

describe('Update Todo Collection Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('fetches the collection', async () => {
      await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '3' }) });
      expect(fetchTodoCollection).toHaveBeenCalledExactlyOnceWith(3);
    });

    it('renders the update todo collection component', async () => {
      const jsx = await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Update the Todo Collection' })).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });

    describe('if the todo collection cannot be fetched', () => {
      it('renders an error message', async () => {
        const jsx = await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '23' }) });
        render(jsx);
        expect(screen.getByText('Failed to fetch the todo collection')).toBeDefined();
      });

      it('does not render the update todo collection component', async () => {
        const jsx = await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '23' }) });
        render(jsx);
        expect(screen.queryByRole('heading', { level: 1, name: 'Update the Todo Collection' })).toBeNull();
      });
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
    });

    it('does not fetch the todo collection', async () => {
      await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '3' }) });
      expect(fetchTodoCollection).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not render the update todo collection component', async () => {
      const jsx = await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Update the Todo Collection' })).toBeNull();
    });
  });
});
