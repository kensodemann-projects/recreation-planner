import { isLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { canDeleteEvent, fetchEvent } from '../../../data';
import DeleteEventPage from '../page';

vi.mock('../../../data');
vi.mock('@/utils/supabase/auth');
vi.mock('next/navigation');

describe('Delete Event Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(true);
    });

    it('fetches the event', async () => {
      await DeleteEventPage({ params: Promise.resolve({ id: '3' }) });
      expect(fetchEvent).toHaveBeenCalledOnce();
      expect(fetchEvent).toHaveBeenCalledWith(3);
    });

    it('determines if the event can be deleted', async () => {
      await DeleteEventPage({ params: Promise.resolve({ id: '3' }) });
      expect(canDeleteEvent).toHaveBeenCalledOnce();
    });

    it('renders the delete event component', async () => {
      const jsx = await DeleteEventPage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Remove Trip / Event' })).toBeDefined();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(false);
    });

    it('does not fetch the event', async () => {
      await DeleteEventPage({ params: Promise.resolve({ id: '3' }) });
      expect(fetchEvent).not.toHaveBeenCalled();
    });

    it('does not determine if the event can be deleted', async () => {
      await DeleteEventPage({ params: Promise.resolve({ id: '3' }) });
      expect(canDeleteEvent).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await DeleteEventPage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });
  });
});
