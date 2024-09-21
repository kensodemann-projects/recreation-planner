import { describe, expect, it, Mock, vi } from 'vitest';
import ReservationsPage from '../page';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';
import { createClient } from '@/utils/supabase/server';

vi.mock('@/utils/supabase/server');

describe('Reservations Page', () => {
  afterEach(() => cleanup());

  describe('when logged in', () => {
    it('renders the equipment component', async () => {
      const jsx = await ReservationsPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Reservations' })).toBeDefined();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      const s = createClient();
      (s.auth.getUser as Mock).mockResolvedValue({ data: { user: null } });
    });

    it('renders the must be logged in component', async () => {
      const jsx = await ReservationsPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });
  });
});
