import { Equipment } from '@/models';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { updateEquipment } from '../../../data';
import { updateConfirmed } from '../actions';
import { redirect } from 'next/navigation';

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

describe('equipment: updateConfirmed', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls updateEquipment with the provided equipment', async () => {
    await updateConfirmed(equipment).catch(() => {});
    expect(updateEquipment).toHaveBeenCalledExactlyOnceWith(equipment);
  });

  describe('when updateEquipment succeeds', () => {
    beforeEach(() => {
      (updateEquipment as Mock).mockResolvedValue(equipment);
    });

    it('redirects to /adventure/equipment', async () => {
      await updateConfirmed(equipment).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/equipment');
    });
  });

  describe('when updateEquipment fails', () => {
    beforeEach(() => {
      (updateEquipment as Mock).mockResolvedValue(null);
    });

    it('redirects to /error', async () => {
      await updateConfirmed(equipment).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
