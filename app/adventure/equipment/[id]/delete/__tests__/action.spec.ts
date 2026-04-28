import { Equipment } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { deleteEquipment } from '../../../data';
import { deleteAborted, deleteConfirmed } from '../actions';

vi.mock('../../../data');
vi.mock('next/navigation');

const equipment: Equipment = {
  id: 42,
  name: 'Test Kayak',
  description: 'A kayak for testing',
  purchaseDate: null,
  cost: null,
  manufacturer: null,
  model: null,
  identification: null,
  length: null,
  weight: null,
  capacity: null,
  licensePlateNumber: null,
  insuranceCarrier: null,
  insurancePolicyNumber: null,
  insuranceContactName: null,
  insuranceContactPhoneNumber: null,
  insuranceContactEmail: null,
  equipmentType: { id: 1, name: 'Kayak', description: 'A small boat' },
};

describe('equipment: delete actions', () => {
  beforeEach(() => vi.clearAllMocks());

  describe('deleteAborted', () => {
    it('does not call deleteEquipment', async () => {
      await deleteAborted().catch(() => {});
      expect(deleteEquipment).not.toHaveBeenCalled();
    });

    it('redirects to /adventure/equipment', async () => {
      await deleteAborted().catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/equipment');
    });
  });

  describe('deleteConfirmed', () => {
    it('calls deleteEquipment with the passed equipment', async () => {
      await deleteConfirmed(equipment).catch(() => {});
      expect(deleteEquipment).toHaveBeenCalledExactlyOnceWith(equipment);
    });

    it('redirects to /adventure/equipment if the delete succeeds', async () => {
      (deleteEquipment as Mock).mockResolvedValue(true);
      await deleteConfirmed(equipment).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/equipment');
    });

    it('redirects to /error if the delete fails', async () => {
      (deleteEquipment as Mock).mockResolvedValue(false);
      await deleteConfirmed(equipment).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
