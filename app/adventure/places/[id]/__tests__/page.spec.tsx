import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { fetchPlace } from '../../data';
import PlacePage from '../page';

vi.mock('@/utils/supabase/auth');
vi.mock('../../data');

describe('Place Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('fetches the place', async () => {
      await PlacePage({ params: Promise.resolve({ id: '2' }) });
      expect(fetchPlace).toHaveBeenCalledExactlyOnceWith(2);
    });

    it('renders the page header', async () => {
      const jsx = await PlacePage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Place Details' })).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await PlacePage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });

    describe('if the place cannot be fetched', () => {
      it('renders an error message', async () => {
        const jsx = await PlacePage({ params: Promise.resolve({ id: '23' }) });
        render(jsx);
        expect(screen.getByText('Failed to fetch the place')).toBeDefined();
      });

      it('does not render the page header', async () => {
        const jsx = await PlacePage({ params: Promise.resolve({ id: '23' }) });
        render(jsx);
        expect(screen.queryByRole('heading', { level: 1, name: 'Place Details' })).toBeNull();
      });
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
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

    it('does not render the page header', async () => {
      const jsx = await PlacePage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Place Details' })).toBeNull();
    });
  });
});
