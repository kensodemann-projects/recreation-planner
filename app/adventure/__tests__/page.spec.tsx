import { EVENT_TYPES } from '@/app/adventure/events/__mocks__/data';
import { fetchPriorEvents, fetchUpcomingEvents } from '@/app/adventure/events/data';
import { PLACES } from '@/app/adventure/places/__mocks__/data';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import HomePage from '../page';
import { fetchDueTodoCollections } from '../todos/data';
import { Event } from '@/models';

vi.mock('@/app/adventure/events/data');
vi.mock('@/app/adventure/todos/data');

describe('Adventures Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('fetches the current events', async () => {
    vi.setSystemTime(new Date(2024, 8, 3));
    await HomePage();
    expect(fetchUpcomingEvents).toHaveBeenCalledExactlyOnceWith('2024-09-03');
  });

  it('fetches the events for last week', async () => {
    vi.setSystemTime(new Date(2024, 8, 3));
    await HomePage();
    expect(fetchPriorEvents).toHaveBeenCalledExactlyOnceWith('2024-09-03', '2024-08-27');
  });

  it('fetches due todo collections due within a week', async () => {
    vi.setSystemTime(new Date(2024, 8, 3));
    await HomePage();
    expect(fetchDueTodoCollections).toHaveBeenCalledExactlyOnceWith('2024-09-10');
  });

  it('renders the dashboard component', async () => {
    const jsx = await HomePage();
    render(jsx);
    expect(screen.getByRole('heading', { level: 1, name: 'Dashboard' })).toBeDefined();
  });
});

describe('current events categorization', () => {
  const makeEvent = (id: number, name: string, beginDate: string): Event => ({
    id,
    name,
    description: null,
    beginDate,
    place: PLACES[0],
    type: EVENT_TYPES[0],
  });

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 8, 3));
    vi.mocked(fetchPriorEvents).mockResolvedValue([]);
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('displays events that begin within the next two weeks', async () => {
    vi.mocked(fetchUpcomingEvents).mockResolvedValue([
      makeEvent(1, 'Near Event 1', '2024-09-05'),
      makeEvent(2, 'Near Event 2', '2024-09-10'),
      makeEvent(3, 'Near Event 3', '2024-09-15'),
      makeEvent(4, 'Far Event', '2024-10-01'),
    ]);
    const jsx = await HomePage();
    render(jsx);
    expect(screen.queryByText('Near Event 1')).not.toBeNull();
    expect(screen.queryByText('Near Event 2')).not.toBeNull();
    expect(screen.queryByText('Near Event 3')).not.toBeNull();
    expect(screen.queryByText('Far Event')).toBeNull();
  });

  it('displays the first three events when fewer than three qualify within two weeks', async () => {
    vi.mocked(fetchUpcomingEvents).mockResolvedValue([
      makeEvent(1, 'Near Event 1', '2024-09-05'),
      makeEvent(2, 'Near Event 2', '2024-09-10'),
      makeEvent(3, 'Far Event 1', '2024-10-01'),
      makeEvent(4, 'Far Event 2', '2024-10-15'),
    ]);
    const jsx = await HomePage();
    render(jsx);
    expect(screen.queryByText('Near Event 1')).not.toBeNull();
    expect(screen.queryByText('Near Event 2')).not.toBeNull();
    expect(screen.queryByText('Far Event 1')).not.toBeNull();
    expect(screen.queryByText('Far Event 2')).toBeNull();
  });

  it('displays both events when there are only two upcoming events', async () => {
    vi.mocked(fetchUpcomingEvents).mockResolvedValue([
      makeEvent(1, 'Event One', '2024-09-05'),
      makeEvent(2, 'Event Two', '2024-09-10'),
    ]);
    const jsx = await HomePage();
    render(jsx);
    expect(screen.queryByText('Event One')).not.toBeNull();
    expect(screen.queryByText('Event Two')).not.toBeNull();
  });

  it('displays the event when there is only one upcoming event', async () => {
    vi.mocked(fetchUpcomingEvents).mockResolvedValue([makeEvent(1, 'Solo Event', '2024-09-05')]);
    const jsx = await HomePage();
    render(jsx);
    expect(screen.queryByText('Solo Event')).not.toBeNull();
  });

  it('displays a message when there are no upcoming events', async () => {
    vi.mocked(fetchUpcomingEvents).mockResolvedValue([]);
    const jsx = await HomePage();
    render(jsx);
    expect(screen.getByText('You have no upcoming events.')).toBeDefined();
  });
});
