import { isLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { canDeletePlace, fetchPlace } from '../../../data';
import DeletePlacePage from '../page';

vi.mock('../../../data');
vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');

describe('Delete Place Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(true);
    });

    it('fetches the place', async () => {
      await DeletePlacePage({ params: Promise.resolve({ id: '3' }) });
      expect(fetchPlace).toHaveBeenCalledOnce();
      expect(fetchPlace).toHaveBeenCalledWith(3);
    });

    it('determines if the place can be deleted', async () => {
      await DeletePlacePage({ params: Promise.resolve({ id: '3' }) });
      expect(canDeletePlace).toHaveBeenCalledOnce();
    });

    it('renders the delete place component', async () => {
      const jsx = await DeletePlacePage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Remove Place' })).toBeDefined();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(false);
    });

    it('does not fetch the place', async () => {
      await DeletePlacePage({ params: Promise.resolve({ id: '3' }) });
      expect(fetchPlace).not.toHaveBeenCalled();
    });

    it('does not determine if the place can be deleted', async () => {
      await DeletePlacePage({ params: Promise.resolve({ id: '3' }) });
      expect(canDeletePlace).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await DeletePlacePage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });
  });
});
