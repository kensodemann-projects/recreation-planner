import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchPlace, fetchPlaceTypes } from '../../../data';
import UpdatePlacePage from '../page';

vi.mock('../../../data');
vi.mock('next/navigation');

describe('Update Place Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('fetches the place', async () => {
    await UpdatePlacePage({ params: Promise.resolve({ id: '3' }) });
    expect(fetchPlace).toHaveBeenCalledExactlyOnceWith(3);
  });

  it('fetches the place types', async () => {
    await UpdatePlacePage({ params: Promise.resolve({ id: '3' }) });
    expect(fetchPlaceTypes).toHaveBeenCalledExactlyOnceWith();
  });

  it('renders the update place component', async () => {
    const jsx = await UpdatePlacePage({ params: Promise.resolve({ id: '3' }) });
    render(jsx);
    expect(screen.getByRole('heading', { level: 1, name: 'Update the Place' })).toBeDefined();
  });

  it('does not render the must be logged in component', async () => {
    const jsx = await UpdatePlacePage({ params: Promise.resolve({ id: '3' }) });
    render(jsx);
    expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
  });

  describe('if the place cannot be fetched', () => {
    it('renders an error message', async () => {
      const jsx = await UpdatePlacePage({ params: Promise.resolve({ id: '23' }) });
      render(jsx);
      expect(screen.getByText('Failed to fetch the place')).toBeDefined();
    });

    it('does not render the update place component', async () => {
      const jsx = await UpdatePlacePage({ params: Promise.resolve({ id: '23' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Update the Place' })).toBeNull();
    });
  });
});
