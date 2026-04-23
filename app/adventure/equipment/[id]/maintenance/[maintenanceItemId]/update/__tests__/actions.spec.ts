import { MAINTENANCE_ITEMS } from '@/app/adventure/equipment/__mocks__/data';
import { updateMaintenanceItem } from '@/app/adventure/equipment/data';
import { MaintenanceItem } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { updateConfirmed } from '../actions';

vi.mock('@/app/adventure/equipment/data');
vi.mock('next/navigation');

const maintenanceItem: MaintenanceItem = {
  ...MAINTENANCE_ITEMS.find((x) => x.id === 2)!,
  equipmentRid: 314,
};

describe('equipment maintenance: updateConfirmed', () => {
  beforeEach(() => vi.clearAllMocks());

  it('updates the specified maintenance item', async () => {
    await updateConfirmed(maintenanceItem);
    expect(updateMaintenanceItem).toHaveBeenCalledExactlyOnceWith(maintenanceItem);
  });

  describe('on success', () => {
    beforeEach(() => {
      (updateMaintenanceItem as any).mockResolvedValue({ ...maintenanceItem });
    });

    it('redirects to the equipment details page', async () => {
      await updateConfirmed(maintenanceItem);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/equipment/314?lastActivity=Maintenance');
    });
  });

  describe('on failure', () => {
    beforeEach(() => {
      (updateMaintenanceItem as any).mockResolvedValue(null);
    });

    it('redirects to error', async () => {
      await updateConfirmed(maintenanceItem);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
