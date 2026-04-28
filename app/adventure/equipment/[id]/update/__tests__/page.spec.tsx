import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchEquipment, fetchEquipmentTypes } from '../../../data';
import UpdateEquipmentPage from '../page';

vi.mock('../../../data');
vi.mock('next/navigation');

describe('Update Equipment Page', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('fetches the equipment', async () => {
    await UpdateEquipmentPage({ params: Promise.resolve({ id: '2' }) });
    expect(fetchEquipment).toHaveBeenCalledExactlyOnceWith(2);
  });

  it('fetches the equipment types', async () => {
    await UpdateEquipmentPage({ params: Promise.resolve({ id: '2' }) });
    expect(fetchEquipmentTypes).toHaveBeenCalledExactlyOnceWith();
  });

  it('renders the update equipment component', async () => {
    const jsx = await UpdateEquipmentPage({ params: Promise.resolve({ id: '2' }) });
    render(jsx);
    expect(screen.getByRole('heading', { level: 1, name: 'Update the Equipment' })).toBeDefined();
  });

  describe('if the equipment cannot be fetched', () => {
    it('renders an error message', async () => {
      const jsx = await UpdateEquipmentPage({ params: Promise.resolve({ id: '23' }) });
      render(jsx);
      expect(screen.getByText('Failed to fetch the equipment')).toBeDefined();
    });

    it('does not render the update equipment component', async () => {
      const jsx = await UpdateEquipmentPage({ params: Promise.resolve({ id: '23' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Update the Equipment' })).toBeNull();
    });
  });
});
