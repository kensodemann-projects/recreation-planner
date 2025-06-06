import { isLoggedIn } from '@/utils/supabase/auth';
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
      (isLoggedIn as Mock).mockResolvedValue(true);
    });

    it('fetches the collection', async () => {
      await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '3' }) });
      expect(fetchTodoCollection).toHaveBeenCalledOnce();
      expect(fetchTodoCollection).toHaveBeenCalledWith(3);
    });

    it('renders the update todo collection component', async () => {
      const jsx = await UpdateTodoCollectionPage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Update the Todo Collection' })).toBeDefined();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(false);
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
  });
});
