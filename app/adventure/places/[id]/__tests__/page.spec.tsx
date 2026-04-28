import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchPlace } from '../../data';
import PlacePage from '../page';

vi.mock('../../data');

describe('Place Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => cleanup());

  it('fetches the place', async () => {
    await PlacePage({ params: Promise.resolve({ id: '2' }) });
    expect(fetchPlace).toHaveBeenCalledExactlyOnceWith(2, true);
  });

  it('renders the page header', async () => {
    const jsx = await PlacePage({ params: Promise.resolve({ id: '2' }) });
    render(jsx);
    expect(screen.getByRole('heading', { level: 1, name: 'Place Details' })).toBeDefined();
  });

  describe('if the place cannot be fetched', () => {
    it('renders an error message', async () => {
      const jsx = await PlacePage({ params: Promise.resolve({ id: '23' }) });
      render(jsx);
      expect(screen.getByText('Failed to fetch the place')).toBeDefined();
    });

    it('does not render the page header', async () => {
      const jsx = await PlacePage({ params: Promise.resolve({ id: '23' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Place Details' })).toBeNull();
    });
  });
});
