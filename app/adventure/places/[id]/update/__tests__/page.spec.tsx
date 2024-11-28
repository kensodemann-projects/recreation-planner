import { isLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { fetchPlace, fetchPlaceTypes } from '../../../data';
import UpdatePlacePage from '../page';

vi.mock('../../../data');
vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');

describe('Update Place Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(true);
    });

    it('fetches the place', async () => {
      await UpdatePlacePage({ params: Promise.resolve({ id: '3' }) });
      expect(fetchPlace).toHaveBeenCalledOnce();
      expect(fetchPlace).toHaveBeenCalledWith(3);
    });

    it('fetches the place types', async () => {
      await UpdatePlacePage({ params: Promise.resolve({ id: '3' }) });
      expect(fetchPlaceTypes).toHaveBeenCalledOnce();
    });

    it('renders the update place component', async () => {
      const jsx = await UpdatePlacePage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Update the Place' })).toBeDefined();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(false);
    });

    it('does not fetch the place', async () => {
      await UpdatePlacePage({ params: Promise.resolve({ id: '3' }) });
      expect(fetchPlace).not.toHaveBeenCalled();
    });

    it('does not fetch the place types', async () => {
      await UpdatePlacePage({ params: Promise.resolve({ id: '3' }) });
      expect(fetchPlaceTypes).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await UpdatePlacePage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });
  });
});
