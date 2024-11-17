import { isLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import EventPage from '../page';
import { fetchEvent } from '../../data';
//import { fetchPlace } from '../../data';

vi.mock('@/utils/supabase/auth');
vi.mock('../../data');

describe('Place Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(true);
    });

    it('fetches the place', async () => {
      await EventPage({ params: Promise.resolve({ id: '2' }) });
      expect(fetchEvent).toHaveBeenCalledOnce();
      expect(fetchEvent).toHaveBeenCalledWith(2);
    });

    it('renders the page header', async () => {
      const jsx = await EventPage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Event / Trip Details' })).toBeDefined();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(false);
    });

    it('does not fetch the place', async () => {
      await EventPage({ params: Promise.resolve({ id: '2' }) });
      expect(fetchEvent).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await EventPage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });
  });
});
