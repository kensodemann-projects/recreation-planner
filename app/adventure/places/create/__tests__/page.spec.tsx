import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { fetchPlaceTypes } from '../../data';
import CreatePlacePage from '../page';

vi.mock('../../data');
vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');

describe('Create Place Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('fetches the place types', async () => {
      await CreatePlacePage();
      expect(fetchPlaceTypes).toHaveBeenCalledExactlyOnceWith();
    });

    it('renders the create place component', async () => {
      const jsx = await CreatePlacePage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Add a New Place' })).toBeDefined();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
    });

    it('does not fetch the place types', async () => {
      await CreatePlacePage();
      expect(fetchPlaceTypes).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await CreatePlacePage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });
  });
});
