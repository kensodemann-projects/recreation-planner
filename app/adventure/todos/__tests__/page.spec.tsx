import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { fetchTodoCollections } from '../data';
import TodosPage from '../page';

vi.mock('@/utils/supabase/auth');
vi.mock('../data');

describe('Todos Page', () => {
  beforeEach(() => vi.clearAllMocks());

  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('renders the todos component', async () => {
      const jsx = await TodosPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Todos' })).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await TodosPage();
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });

    it('fetches the open TODO collections', async () => {
      await TodosPage();
      expect(fetchTodoCollections).toHaveBeenCalledExactlyOnceWith();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
    });

    it('renders the must be logged in component', async () => {
      const jsx = await TodosPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not render the todos component', async () => {
      const jsx = await TodosPage();
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Todos' })).toBeNull();
    });

    it('does not fetche the open TODO collections', async () => {
      await TodosPage();
      expect(fetchTodoCollections).not.toHaveBeenCalled();
    });
  });
});
