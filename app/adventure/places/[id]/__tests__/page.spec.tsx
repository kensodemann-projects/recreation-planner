import { isLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import PlacePage from '../page';
import { fetchPlace } from '../../data';

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
      await PlacePage({ params: Promise.resolve({ id: '2' }) });
      expect(fetchPlace).toHaveBeenCalledOnce();
      expect(fetchPlace).toHaveBeenCalledWith(2);
    });

    it('renders the reservations component', async () => {
      const jsx = await PlacePage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Indianapolis Motor Speedway' })).toBeDefined();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(false);
    });

    it('does not fetch the place', async () => {
      await PlacePage({ params: Promise.resolve({ id: '2' }) });
      expect(fetchPlace).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await PlacePage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });
  });
});
