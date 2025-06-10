import { isLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { fetchEventTypes, fetchPlaces } from '../../data';
import CreateEventPage from '../page';

vi.mock('../../data');
vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');

describe('Create Place Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(true);
    });

    it('fetches the event types', async () => {
      await CreateEventPage();
      expect(fetchEventTypes).toHaveBeenCalledOnce();
    });

    it('fetches the places', async () => {
      await CreateEventPage();
      expect(fetchPlaces).toHaveBeenCalledOnce();
    });

    it('renders the create event header', async () => {
      const jsx = await CreateEventPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Add a New Trip / Event' })).toBeDefined();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(false);
    });

    it('does not fetch the place types', async () => {
      await CreateEventPage();
      expect(fetchEventTypes).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await CreateEventPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });
  });
});
