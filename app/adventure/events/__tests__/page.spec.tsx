import { isLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { fetchEvents } from '../data';
import EventsPage from '../page';

vi.mock('@/utils/supabase/auth');
vi.mock('../data');

describe('Events Page', () => {
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(true);
    });

    it('fetches the events', async () => {
      await EventsPage();
      expect(fetchEvents).toHaveBeenCalledOnce();
    });

    it('renders the activities component', async () => {
      const jsx = await EventsPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Trips & Events' })).toBeDefined();
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
