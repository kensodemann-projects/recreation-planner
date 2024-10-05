import { createClient } from '@/utils/supabase/server';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import EventsPage from '../page';
import { isLoggedIn } from '@/utils/supabase/auth';

vi.mock('@/utils/supabase/auth');

describe('Todos Page', () => {
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(true);
    });

    it('renders the todos component', async () => {
      const jsx = await EventsPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Todos' })).toBeDefined();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(false);
    });

    it('renders the must be logged in component', async () => {
      const jsx = await EventsPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });
  });
});
