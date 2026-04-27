import { fetchUpcomingEvents } from '@/app/adventure/events/data';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchLatestEvents } from '../events/__mocks__/data';
import HomePage from '../page';
import { fetchDueTodoCollections } from '../todos/data';

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
    expect(fetchUpcomingEvents).toHaveBeenCalledExactlyOnceWith('2024-09-01', '2024-09-28');
  });

  it('fetchs the latest three created events', async () => {
    await HomePage();
    expect(fetchLatestEvents).toHaveBeenCalledExactlyOnceWith(3);
  });

  it('fetches due todo collections', async () => {
    vi.setSystemTime(new Date(2024, 8, 3));
    await HomePage();
    expect(fetchDueTodoCollections).toHaveBeenCalledExactlyOnceWith('2024-09-07');
  });

  it('renders the dashboard component', async () => {
    const jsx = await HomePage();
    render(jsx);
    expect(screen.getByRole('heading', { level: 1, name: 'Dashboard' })).toBeDefined();
  });

  it('does not render the must be logged in component', async () => {
    const jsx = await HomePage();
    render(jsx);
    expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
  });
});
