import { EQUIPMENT, MAINTENANCE_ITEMS } from '@/app/adventure/equipment/__mocks__/data';
import {
  fetchEquipment,
  fetchMaintenanceItem,
  fetchMaintenanceTypes,
  fetchUsageUnits,
} from '@/app/adventure/equipment/data';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import UpdateMaintenanceItemPage from '../page';

vi.mock('@/utils/supabase/auth');
vi.mock('@/app/adventure/equipment/data');
vi.mock('next/navigation');

describe('maintenance item update page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (fetchMaintenanceItem as Mock).mockResolvedValue(MAINTENANCE_ITEMS[1]);
  });
  afterEach(() => cleanup());

  it('fetches the equipmnt event', async () => {
    await UpdateMaintenanceItemPage({ params: Promise.resolve({ id: '2', maintenanceItemId: '42' }) });
    expect(fetchMaintenanceItem).toHaveBeenCalledExactlyOnceWith(42);
  });

  it('fetches the equipment', async () => {
    await UpdateMaintenanceItemPage({ params: Promise.resolve({ id: '2', maintenanceItemId: '42' }) });
    expect(fetchEquipment).toHaveBeenCalledExactlyOnceWith(MAINTENANCE_ITEMS[1].equipmentRid);
  });

  it('fetches the equipment event types', async () => {
    await UpdateMaintenanceItemPage({ params: Promise.resolve({ id: '2', maintenanceItemId: '42' }) });
    expect(fetchMaintenanceTypes).toHaveBeenCalledExactlyOnceWith();
  });

  it('fetches the usage units', async () => {
    await UpdateMaintenanceItemPage({ params: Promise.resolve({ id: '2', maintenanceItemId: '42' }) });
    expect(fetchUsageUnits).toHaveBeenCalledExactlyOnceWith();
  });

  it('renders the page headers', async () => {
    const jsx = await UpdateMaintenanceItemPage({ params: Promise.resolve({ id: '2', maintenanceItemId: '42' }) });
    render(jsx);
    expect(screen.getByRole('heading', { level: 1, name: 'Update Maintenance Event' })).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: `For: ${EQUIPMENT[2].name}` })).toBeDefined();
  });

  it('does not render the must be logged in component', async () => {
    const jsx = await UpdateMaintenanceItemPage({ params: Promise.resolve({ id: '2', maintenanceItemId: '42' }) });
    render(jsx);
    expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
  });

  it('does not renders a fetch failure message', async () => {
    const jsx = await UpdateMaintenanceItemPage({ params: Promise.resolve({ id: '2', maintenanceItemId: '42' }) });
    render(jsx);
    expect(screen.queryByText('Failed to fetch the maintenance event')).toBeNull();
  });

  describe('if the maintenance event cannot be fetched', () => {
    beforeEach(() => {
      (fetchMaintenanceItem as Mock).mockResolvedValueOnce(null);
    });

    it('does not fetch the extra data', async () => {
      await UpdateMaintenanceItemPage({ params: Promise.resolve({ id: '2', maintenanceItemId: '42' }) });
      expect(fetchMaintenanceTypes).not.toHaveBeenCalled();
      expect(fetchUsageUnits).not.toHaveBeenCalled();
      expect(fetchEquipment).not.toHaveBeenCalled();
    });

    it('renders a simple error message', async () => {
      const jsx = await UpdateMaintenanceItemPage({ params: Promise.resolve({ id: '2', maintenanceItemId: '42' }) });
      render(jsx);
      expect(screen.getByText('Failed to fetch the maintenance event')).toBeDefined();
    });

    it('does not render the page headers', async () => {
      const jsx = await UpdateMaintenanceItemPage({ params: Promise.resolve({ id: '2', maintenanceItemId: '42' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'Update Maintenance Event' })).toBeNull();
      expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
    });

    it('does not render the must be logged in component', async () => {
      const jsx = await UpdateMaintenanceItemPage({ params: Promise.resolve({ id: '2', maintenanceItemId: '42' }) });
      render(jsx);
      expect(screen.queryByRole('heading', { level: 1, name: 'You must be logged in' })).toBeNull();
    });
  });
});
