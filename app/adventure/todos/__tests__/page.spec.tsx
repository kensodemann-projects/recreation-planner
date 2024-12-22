import { isLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import TodosPage from '../page';
import { fetchOpenTodoCollections } from '../data';

vi.mock('@/utils/supabase/auth');
vi.mock('../data');

describe('Todos Page', () => {
  beforeEach(() => vi.clearAllMocks());

  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(true);
    });

    it('renders the todos component', async () => {
      const jsx = await TodosPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Todos' })).toBeDefined();
    });

    it('fetches the open TODO collections', async () => {
      await TodosPage();
      expect(fetchOpenTodoCollections).toHaveBeenCalledExactlyOnceWith();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(false);
    });

    it('renders the must be logged in component', async () => {
      const jsx = await TodosPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });
  });
});
