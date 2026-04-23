import { Event } from '@/models';
import { describe, beforeEach, vi, it, expect } from 'vitest';
import { EVENTS } from '@/app/adventure/events/__mocks__/data';
import { updateConfirmed } from '../actions';
import { redirect } from 'next/navigation';
import { updateEvent } from '@/app/adventure/events/data';

vi.mock('@/app/adventure/events/data');
vi.mock('next/navigation');

const event: Event = EVENTS.find((e) => e.id === 2)!;

describe('events: updateConfirmed', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls updateEvent with the specified event', async () => {
    await updateConfirmed(event, 'Home');
    expect(updateEvent).toHaveBeenCalledExactlyOnceWith(event);
  });

  describe('when the update succeeds', () => {
    beforeEach(() => {
      (updateEvent as any).mockResolvedValue(event);
    });

    it.each([
      {
        page: 'Home',
        expected: '/adventure',
      },
      {
        page: 'Event',
        expected: '/adventure/events',
      },
      {
        page: 'Default',
        expected: '/adventure/events',
      },
    ])('redirects to the $page page', async ({ page, expected }) => {
      await updateConfirmed(event, page);
      expect(redirect).toHaveBeenCalledExactlyOnceWith(expected);
    });
  });

  describe('when the update does not succeed', () => {
    beforeEach(() => {
      (updateEvent as any).mockResolvedValue(null);
    });

    it('redirects to /error', async () => {
      await updateConfirmed(event, 'Home');
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
