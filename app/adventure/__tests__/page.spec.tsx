import { fetchPriorEvents, fetchUpcomingEvents } from '@/app/adventure/events/data';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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
