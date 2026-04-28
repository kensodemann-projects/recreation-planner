import { fetchPlaces } from '@/app/adventure/places/data';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchEventTypes } from '../../data';
import CreateEventPage from '../page';

vi.mock('../../data');
vi.mock('next/navigation');
vi.mock('@/app/adventure/places/data');

describe('Create Event Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('fetches the event types', async () => {
    await CreateEventPage();
    expect(fetchEventTypes).toHaveBeenCalledExactlyOnceWith();
  });

  it('fetches the places', async () => {
    await CreateEventPage();
    expect(fetchPlaces).toHaveBeenCalledExactlyOnceWith();
  });

  it('renders the create event header', async () => {
    const jsx = await CreateEventPage();
    render(jsx);
    expect(screen.getByRole('heading', { level: 1, name: 'Add a New Trip / Event' })).toBeDefined();
  });
});
