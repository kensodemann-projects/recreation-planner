import { isLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { fetchPriorEvents, fetchUpcomingEvents } from '../data';
import EventsPage from '../page';

vi.mock('@/utils/supabase/auth');
vi.mock('../data');

describe('Events Page', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  describe('when logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(true);
    });

    it('fetches the current events', async () => {
      vi.setSystemTime(new Date(2024, 10, 27));
      await EventsPage();
      expect(fetchUpcomingEvents).toHaveBeenCalledOnce();
      expect(fetchUpcomingEvents).toHaveBeenCalledWith('2024-11-24');
    });

    it('fetches the prior events', async () => {
      vi.setSystemTime(new Date(2024, 10, 27));
      await EventsPage();
      expect(fetchPriorEvents).toHaveBeenCalledOnce();
      expect(fetchPriorEvents).toHaveBeenCalledWith('2024-11-24');
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
