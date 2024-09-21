import { describe, expect, it, Mock, vi } from 'vitest';
import EventsPage from '../page';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';
import { createClient } from '@/utils/supabase/server';

vi.mock('@/utils/supabase/server');

describe('Events Page', () => {
  afterEach(() => cleanup());

  describe('when logged in', () => {
    it('renders the events component', async () => {
      const jsx = await EventsPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Events' })).toBeDefined();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      const s = createClient();
      (s.auth.getUser as Mock).mockResolvedValue({ data: { user: null } });
    });

    it('renders the must be logged in component', async () => {
      const jsx = await EventsPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });
  });
});
