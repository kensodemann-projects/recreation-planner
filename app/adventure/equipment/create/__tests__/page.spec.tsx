import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchEquipmentTypes } from '../../data';
import CreateEquipmentPage from '../page';

vi.mock('../../data');
vi.mock('next/navigation');

describe('Create Equipment Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('fetches the equipment types', async () => {
    await CreateEquipmentPage();
    expect(fetchEquipmentTypes).toHaveBeenCalledExactlyOnceWith();
  });

  it('renders the create equipment component', async () => {
    const jsx = await CreateEquipmentPage();
    render(jsx);
    expect(screen.getByRole('heading', { level: 1, name: 'Add a New Piece of Equipment' })).toBeDefined();
  });

  it('does not render the must be logged in component', async () => {
    const jsx = await CreateEquipmentPage();
    render(jsx);
    expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
  });
});
