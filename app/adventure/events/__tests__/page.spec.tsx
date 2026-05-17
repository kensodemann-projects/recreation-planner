import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { cookies } from 'next/headers';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { setShowAllPriorEvents, setShowAllUpcomingEvents } from '../actions';
import { fetchPriorEvents, fetchUpcomingEvents } from '../data';
import EventsPage from '../page';

vi.mock('../data');
vi.mock('../actions');
vi.mock('next/headers', () => ({ cookies: vi.fn().mockResolvedValue({ get: vi.fn() }) }));

describe('Events Page', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    vi.mocked(cookies).mockResolvedValue({ get: vi.fn() } as unknown as ReturnType<typeof cookies>);
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it('fetches the current events for the next three months', async () => {
    vi.setSystemTime(new Date(2024, 10, 27));
    await EventsPage();
    expect(fetchUpcomingEvents).toHaveBeenCalledExactlyOnceWith('2024-11-24', '2025-02-24');
  });

  it('fetches the prior events', async () => {
    vi.setSystemTime(new Date(2024, 10, 27));
    await EventsPage();
    expect(fetchPriorEvents).toHaveBeenCalledExactlyOnceWith('2024-11-24', '2024-10-24');
  });

  it('renders the activities component', async () => {
    const jsx = await EventsPage();
    render(jsx);
    expect(screen.getByRole('heading', { level: 1, name: 'Trips & Events' })).toBeDefined();
  });

  describe('show all upcoming events', () => {
    it('fetches all upcoming events when the show-all-upcoming-events cookie is true', async () => {
      const cookieStore = await cookies();
      vi.setSystemTime(new Date(2024, 10, 27));
      (cookieStore.get as Mock).mockImplementation((name: string) =>
        name === 'show-all-upcoming-events' ? { value: 'true' } : undefined,
      );
      await EventsPage();
      expect(fetchUpcomingEvents).toHaveBeenCalledExactlyOnceWith('2024-11-24');
    });

    it('fetches bounded upcoming events when the show-all-upcoming-events cookie is false', async () => {
      const cookieStore = await cookies();
      vi.setSystemTime(new Date(2024, 10, 27));
      (cookieStore.get as Mock).mockImplementation((name: string) =>
        name === 'show-all-upcoming-events' ? { value: 'false' } : undefined,
      );
      await EventsPage();
      expect(fetchUpcomingEvents).toHaveBeenCalledExactlyOnceWith('2024-11-24', '2025-02-24');
    });

    it('fetches bounded upcoming events when the show-all-upcoming-events cookie is absent', async () => {
      vi.setSystemTime(new Date(2024, 10, 27));
      await EventsPage();
      expect(fetchUpcomingEvents).toHaveBeenCalledExactlyOnceWith('2024-11-24', '2025-02-24');
    });

    it('renders the upcoming Show All checkbox as checked when the cookie is true', async () => {
      const cookieStore = await cookies();
      (cookieStore.get as Mock).mockImplementation((name: string) =>
        name === 'show-all-upcoming-events' ? { value: 'true' } : undefined,
      );
      const jsx = await EventsPage();
      render(jsx);
      const checkboxes = screen.getAllByLabelText('Show All', { selector: 'input[type="checkbox"]' });
      expect((checkboxes[0] as HTMLInputElement).checked).toBe(true);
    });
  });

  describe('show all prior events', () => {
    it('fetches all prior events when the show-all-prior-events cookie is true', async () => {
      const cookieStore = await cookies();
      vi.setSystemTime(new Date(2024, 10, 27));
      (cookieStore.get as Mock).mockImplementation((name: string) =>
        name === 'show-all-prior-events' ? { value: 'true' } : undefined,
      );
      await EventsPage();
      expect(fetchPriorEvents).toHaveBeenCalledExactlyOnceWith('2024-11-24');
    });

    it('fetches bounded prior events when the show-all-prior-events cookie is false', async () => {
      const cookieStore = await cookies();
      vi.setSystemTime(new Date(2024, 10, 27));
      (cookieStore.get as Mock).mockImplementation((name: string) =>
        name === 'show-all-prior-events' ? { value: 'false' } : undefined,
      );
      await EventsPage();
      expect(fetchPriorEvents).toHaveBeenCalledExactlyOnceWith('2024-11-24', '2024-10-24');
    });

    it('fetches bounded prior events when the show-all-prior-events cookie is absent', async () => {
      vi.setSystemTime(new Date(2024, 10, 27));
      await EventsPage();
      expect(fetchPriorEvents).toHaveBeenCalledExactlyOnceWith('2024-11-24', '2024-10-24');
    });

    it('renders the prior Show All checkbox as checked when the cookie is true', async () => {
      const cookieStore = await cookies();
      (cookieStore.get as Mock).mockImplementation((name: string) =>
        name === 'show-all-prior-events' ? { value: 'true' } : undefined,
      );
      const jsx = await EventsPage();
      render(jsx);
      const checkboxes = screen.getAllByLabelText('Show All', { selector: 'input[type="checkbox"]' });
      expect((checkboxes[1] as HTMLInputElement).checked).toBe(true);
    });
  });

  describe('action wiring', () => {
    beforeEach(() => vi.useRealTimers());

    it('calls setShowAllUpcomingEvents(true) when the upcoming Show All checkbox is clicked', async () => {
      const user = userEvent.setup();
      const jsx = await EventsPage();
      render(jsx);
      const checkboxes = screen.getAllByLabelText('Show All', { selector: 'input[type="checkbox"]' });
      await user.click(checkboxes[0]);
      expect(setShowAllUpcomingEvents).toHaveBeenCalledExactlyOnceWith(true);
    });

    it('calls setShowAllPriorEvents(true) when the prior Show All checkbox is clicked', async () => {
      const user = userEvent.setup();
      const jsx = await EventsPage();
      render(jsx);
      const checkboxes = screen.getAllByLabelText('Show All', { selector: 'input[type="checkbox"]' });
      await user.click(checkboxes[1]);
      expect(setShowAllPriorEvents).toHaveBeenCalledExactlyOnceWith(true);
    });

    it('calls setShowAllUpcomingEvents(false) when the upcoming Show All checkbox is unchecked', async () => {
      const cookieStore = await cookies();
      (cookieStore.get as Mock).mockImplementation((name: string) =>
        name === 'show-all-upcoming-events' ? { value: 'true' } : undefined,
      );
      const user = userEvent.setup();
      const jsx = await EventsPage();
      render(jsx);
      const checkboxes = screen.getAllByLabelText('Show All', { selector: 'input[type="checkbox"]' });
      await user.click(checkboxes[0]);
      expect(setShowAllUpcomingEvents).toHaveBeenCalledExactlyOnceWith(false);
    });

    it('calls setShowAllPriorEvents(false) when the prior Show All checkbox is unchecked', async () => {
      const cookieStore = await cookies();
      (cookieStore.get as Mock).mockImplementation((name: string) =>
        name === 'show-all-prior-events' ? { value: 'true' } : undefined,
      );
      const user = userEvent.setup();
      const jsx = await EventsPage();
      render(jsx);
      const checkboxes = screen.getAllByLabelText('Show All', { selector: 'input[type="checkbox"]' });
      await user.click(checkboxes[1]);
      expect(setShowAllPriorEvents).toHaveBeenCalledExactlyOnceWith(false);
    });
  });
});
