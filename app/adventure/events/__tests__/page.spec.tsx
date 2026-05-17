import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchPriorEvents, fetchUpcomingEvents } from '../data';
import EventsPage from '../page';

vi.mock('../data');

describe('Events Page', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
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
});
