import { isLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import CreateTodoCollectionPage from '../page';

vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');

describe('Create Todo Collection Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(true);
    });

    it('renders the create todo collection component', async () => {
      const jsx = await CreateTodoCollectionPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Add a New Todo Collection' })).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await CreateTodoCollectionPage();
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(false);
    });

    it('renders the must be logged in component', async () => {
      const jsx = await CreateTodoCollectionPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not render the create todo collection component', async () => {
      const jsx = await CreateTodoCollectionPage();
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Add a New Todo Collection' })).toBeNull();
    });
  });
});
