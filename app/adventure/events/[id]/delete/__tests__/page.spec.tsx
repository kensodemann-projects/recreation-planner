import { isLoggedIn } from '@/utils/supabase/auth';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { canDeleteEvent, fetchEvent } from '../../../data';
import DeleteEventPage from '../page';
import { EVENTS } from '../../../__mocks__/data';

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
      expect(fetchEvent).toHaveBeenCalledExactlyOnceWith(3);
    });

    it('determines if the event can be deleted', async () => {
      await DeleteEventPage({ params: Promise.resolve({ id: '3' }) });
      expect(canDeleteEvent).toHaveBeenCalledExactlyOnceWith(EVENTS.find((x) => x.id === 3));
    });

    it('renders the delete event component', async () => {
      const jsx = await DeleteEventPage({ params: Promise.resolve({ id: '3' }) });
      render(jsx);
      expect(screen.getByRole('heading', { level: 1, name: 'Remove Trip / Event' })).toBeDefined();
    });

    describe('if the event cannot be fetched', () => {
      it('renders an error message', async () => {
        const jsx = await DeleteEventPage({ params: Promise.resolve({ id: '524' }) });
        render(jsx);
        expect(screen.getByText('Failed to fetch the event')).toBeDefined();
      });

      it('does not render the delete equipment component', async () => {
        const jsx = await DeleteEventPage({ params: Promise.resolve({ id: '524' }) });
        render(jsx);
        expect(screen.queryByRole('heading', { level: 1, name: 'Remove Trip / Event' })).toBeNull();
      });
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
