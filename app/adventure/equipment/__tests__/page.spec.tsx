import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchAllEquipment } from '../data';
import EquipmentPage from '../page';

vi.mock('../data');

describe('Equipment Page', () => {
  afterEach(() => cleanup());
  beforeEach(() => vi.clearAllMocks());

  it('fetches the equipment', async () => {
    const jsx = await EquipmentPage();
    render(jsx);
    expect(fetchAllEquipment).toHaveBeenCalledExactlyOnceWith();
  });

  it('renders the equipment component', async () => {
    const jsx = await EquipmentPage();
    render(jsx);
    expect(screen.getByRole('heading', { level: 1, name: 'Equipment' })).toBeDefined();
  });
});
