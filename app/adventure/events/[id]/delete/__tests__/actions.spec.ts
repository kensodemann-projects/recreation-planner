import { Event } from '@/models';
import { EVENTS } from '@/app/adventure/events/__mocks__/data';
import { describe, beforeEach, vi, it, expect, type Mock } from 'vitest';
import { deleteAborted, deleteConfirmed } from '../actions';
import { deleteEvent } from '@/app/adventure/events/data';
import { redirect } from 'next/navigation';

vi.mock('@/app/adventure/events/data');
vi.mock('next/navigation');

const event: Event = EVENTS.find((e) => e.id === 1)!;

describe('events: delete actions', () => {
  beforeEach(() => vi.clearAllMocks());

  describe('deleteConfirmed', () => {
    it('calls deleteEvent', async () => {
      await deleteConfirmed(event, 'Home').catch(() => {});
      expect(deleteEvent).toHaveBeenCalledExactlyOnceWith(event);
    });

    it.each([
      { page: 'Home', expected: '/adventure' },
      { page: 'Event', expected: '/adventure/events' },
      { page: 'Default', expected: '/adventure/events' },
    ])('redirects to the $page page if the delete succeeds', async ({ page, expected }) => {
      (deleteEvent as Mock).mockResolvedValue(true);
      await deleteConfirmed(event, page).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith(expected);
    });

    it.each([{ page: 'Home' }, { page: 'Event' }, { page: 'Default' }])(
      'redirects to /error if the delete fails ($page)',
      async ({ page }) => {
        (deleteEvent as Mock).mockResolvedValue(false);
        await deleteConfirmed(event, page).catch(() => {});
        expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
      },
    );
  });

  describe('deleteAborted', () => {
    it('does not call deleteEvent', async () => {
      await deleteAborted('Home').catch(() => {});
      expect(deleteEvent).not.toHaveBeenCalled();
    });

    it.each([
      { page: 'Home', expected: '/adventure' },
      { page: 'Event', expected: '/adventure/events' },
      { page: 'Default', expected: '/adventure/events' },
    ])('redirects to the $page page', async ({ page, expected }) => {
      await deleteAborted(page).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith(expected);
    });
  });
});
