import { isLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import EventPage from '../page';
import { fetchEvent, fetchTodoCollectionsForEvent } from '../../data';

vi.mock('@/utils/supabase/auth');
vi.mock('../../data');

describe('Event Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => cleanup());

  describe('when logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(true);
    });

    it('fetches the event', async () => {
      await EventPage({ params: Promise.resolve({ id: '2' }) });
      expect(fetchEvent).toHaveBeenCalledExactlyOnceWith(2);
    });

    it('fetches the todo collections for the event', async () => {
      await EventPage({ params: Promise.resolve({ id: '2' }) });
      expect(fetchTodoCollectionsForEvent).toHaveBeenCalledExactlyOnceWith(2);
    });

    it('renders the page header', async () => {
      const jsx = await EventPage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Trip / Event Details' })).toBeDefined();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await EventPage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      (isLoggedIn as Mock).mockResolvedValue(false);
    });

    it('does not fetch any data', async () => {
      await EventPage({ params: Promise.resolve({ id: '2' }) });
      expect(fetchEvent).not.toHaveBeenCalled();
      expect(fetchTodoCollectionsForEvent).not.toHaveBeenCalled();
    });

    it('renders the must be logged in component', async () => {
      const jsx = await EventPage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'You must be logged in' })).toBeDefined();
    });

    it('does not render the page header', async () => {
      const jsx = await EventPage({ params: Promise.resolve({ id: '2' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Trip / Event Details' })).toBeNull();
    });
  });
});
