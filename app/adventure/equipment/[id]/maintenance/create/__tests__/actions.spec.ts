import { MAINTENANCE_ITEMS } from '@/app/adventure/equipment/__mocks__/data';
import { createConfirmed } from '../actions';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { addMaintenanceItem } from '@/app/adventure/equipment/data';
import { redirect } from 'next/navigation';
import { MaintenanceItem } from '@/models';

vi.mock('@/app/adventure/equipment/data');
vi.mock('next/navigation');

const maintenanceItem: MaintenanceItem = {
  ...MAINTENANCE_ITEMS.find((x) => x.id === 2)!,
  equipmentRid: 314,
  id: undefined,
};

describe('equipment maintenance: createConfirmed', () => {
  beforeEach(() => vi.clearAllMocks());

  it('adds the specified maintenance item', async () => {
    await createConfirmed(maintenanceItem);
    expect(addMaintenanceItem).toHaveBeenCalledExactlyOnceWith(maintenanceItem);
  });

  describe('on success', () => {
    beforeEach(() => {
      (addMaintenanceItem as any).mockResolvedValue({ ...maintenanceItem, id: 73 });
    });

    it('redirects to the equipment details page', async () => {
      await createConfirmed(maintenanceItem);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/equipment/314?lastActivity=Maintenance');
    });
  });

  describe('on failure', () => {
    beforeEach(() => {
      (addMaintenanceItem as any).mockResolvedValue(null);
    });

    it('redirects to error', async () => {
      await createConfirmed(maintenanceItem);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
