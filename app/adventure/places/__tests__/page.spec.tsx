import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchPlaces, fetchPlaceTypes } from '../data';
import PlacesPage from '../page';

vi.mock('../data');

describe('Places Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => cleanup());

  it('fetches the places', async () => {
    await PlacesPage();
    expect(fetchPlaces).toHaveBeenCalledExactlyOnceWith();
  });

  it('fetches the place types', async () => {
    await PlacesPage();
    expect(fetchPlaceTypes).toHaveBeenCalledExactlyOnceWith();
  });

  it('renders the places component', async () => {
    const jsx = await PlacesPage();
    render(jsx);
    expect(screen.getByRole('heading', { level: 1, name: 'Places' })).toBeDefined();
  });
});
