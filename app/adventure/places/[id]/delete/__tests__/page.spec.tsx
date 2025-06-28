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

    it('does not render the must be logged in component', async () => {
      const jsx = await DeletePlacePage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });

    describe('if the place cannot be fetched', () => {
      it('renders an error message', async () => {
        const jsx = await DeletePlacePage({ params: Promise.resolve({ id: '23' }) });
        render(jsx);
        expect(screen.getByText('Failed to fetch the place')).toBeDefined();
      });

      it('does not render the delete equipment component', async () => {
        const jsx = await DeletePlacePage({ params: Promise.resolve({ id: '23' }) });
        render(jsx);
        expect(screen.queryByRole('heading', { level: 1, name: 'Remove Place' })).toBeNull();
      });
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

    it('does not render the delete place component', async () => {
      const jsx = await DeletePlacePage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Remove Place' })).toBeNull();
    });
  });
});
