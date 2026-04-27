import { fetchPlaces } from '@/app/adventure/places/data';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchEvent, fetchEventTypes } from '../../../data';
import UpdateEventPage from '../page';

vi.mock('../../../data');
vi.mock('next/navigation');
vi.mock('@/app/adventure/places/data');

describe('Update Trip / Event Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('does not render the must be logged in component', async () => {
    const jsx = await UpdateEventPage({ params: Promise.resolve({ id: '3' }) });
    render(jsx);
    expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
  });

  it('fetchs the event', async () => {
    await UpdateEventPage({ params: Promise.resolve({ id: '3' }) });
    expect(fetchEvent).toHaveBeenCalledExactlyOnceWith(3);
  });

  it('fetches the event types', async () => {
    await UpdateEventPage({ params: Promise.resolve({ id: '3' }) });
    expect(fetchEventTypes).toHaveBeenCalledExactlyOnceWith();
  });

  it('fetches the places', async () => {
    await UpdateEventPage({ params: Promise.resolve({ id: '3' }) });
    expect(fetchPlaces).toHaveBeenCalledExactlyOnceWith();
  });

  it('renders the update events component', async () => {
    const jsx = await UpdateEventPage({ params: Promise.resolve({ id: '3' }) });
    render(jsx);
    expect(screen.getByRole('heading', { level: 1, name: 'Update the Trip / Event' })).toBeDefined();
  });

  it('does not render the must be logged in component', async () => {
    const jsx = await UpdateEventPage({ params: Promise.resolve({ id: '3' }) });
    render(jsx);
    expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
  });

  describe('if the event cannot be fetched', () => {
    it('renders an error message', async () => {
      const jsx = await UpdateEventPage({ params: Promise.resolve({ id: '524' }) });
      render(jsx);
      expect(screen.getByText('Failed to fetch the event')).toBeDefined();
    });

    it('does not render the update events component', async () => {
      const jsx = await UpdateEventPage({ params: Promise.resolve({ id: '524' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Update Trip / Event' })).toBeNull();
    });
  });
});
