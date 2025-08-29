import { isNotLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { fetchEventTypes } from '../../data';
import CreateEventPage from '../page';
import { fetchPlaces } from '@/app/adventure/places/data';

vi.mock('../../data');
vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');
vi.mock('@/app/adventure/places/data');

describe('Create Place Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(false);
    });

    it('fetches the event types', async () => {
      await CreateEventPage();
      expect(fetchEventTypes).toHaveBeenCalledExactlyOnceWith();
    });

    it('fetches the places', async () => {
      await CreateEventPage();
      expect(fetchPlaces).toHaveBeenCalledExactlyOnceWith();
    });

    it('renders the create event header', async () => {
      const jsx = await CreateEventPage();
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Add a New Trip / Event' })).toBeDefined();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isNotLoggedIn as Mock).mockResolvedValue(true);
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
