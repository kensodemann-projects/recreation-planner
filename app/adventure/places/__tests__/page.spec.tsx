import { isLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import PlacesPage from '../page';
import { fetchPlaces } from '../data';

vi.mock('../data');
vi.mock('@/utils/supabase/auth');

describe('Places Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(true);
    });

    it('fetches the places', async () => {
      await PlacesPage();
      expect(fetchPlaces).toHaveBeenCalledExactlyOnceWith();
    });

    it('renders the places component', async () => {
      const jsx = await PlacesPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Places' })).toBeDefined();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(false);
    });

    it('does not fetch the places', async () => {
      await PlacesPage();
      expect(fetchPlaces).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await PlacesPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });
  });
});
