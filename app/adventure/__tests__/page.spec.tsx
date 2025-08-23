import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import HomePage from '../page';
import { fetchUpcomingEvents } from '@/app/adventure/events/data';
import { fetchLatestEvents } from '../events/__mocks__/data';

vi.mock('@/utils/supabase/auth');
vi.mock('@/app/adventure/events/data');

describe('Adventures Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  describe('when logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('fetches the current events', async () => {
      vi.setSystemTime(new Date(2024, 8, 3));
      await HomePage();
      expect(fetchUpcomingEvents).toHaveBeenCalledExactlyOnceWith('2024-09-01', '2024-09-28');
    });

    it('fetchs the latest three created events', async () => {
      vi.setSystemTime(new Date(2024, 8, 3));
      await HomePage();
      expect(fetchLatestEvents).toHaveBeenCalledExactlyOnceWith(3);
    });

    it('renders the dashboard component', async () => {
      const jsx = await HomePage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Dashboard' })).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await HomePage();
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
    });

    it('renders the must be logged in component', async () => {
      const jsx = await HomePage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not fetch the current events', async () => {
      vi.setSystemTime(new Date(2024, 8, 3));
      await HomePage();
      expect(fetchUpcomingEvents).not.toHaveBeenCalled();
    });

    it('does not render the dashboard component', async () => {
      const jsx = await HomePage();
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Dashboard' })).toBeNull();
    });
  });
});
