import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchPlaceTypes } from '../../data';
import CreatePlacePage from '../page';

vi.mock('../../data');
vi.mock('next/navigation');

describe('Create Place Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('fetches the place types', async () => {
    await CreatePlacePage();
    expect(fetchPlaceTypes).toHaveBeenCalledExactlyOnceWith();
  });

  it('renders the create place component', async () => {
    const jsx = await CreatePlacePage();
    render(jsx);
    expect(screen.getByRole('heading', { level: 1, name: 'Add a New Place' })).toBeDefined();
  });
});
