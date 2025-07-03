import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import CreateReservationPage from '../page';

vi.mock('../../data');
vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');

describe('Create Reservation Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('renders the create reservation component', async () => {
      const jsx = await CreateReservationPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Add a New Reservation' })).toBeDefined();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
    });

    it('renders the must be logged in component', async () => {
      const jsx = await CreateReservationPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });
  });
});
