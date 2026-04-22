import { Equipment } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { addEquipment } from '../../data';
import { createEquipmentConfirmed } from '../actions';

vi.mock('../../data');
vi.mock('next/navigation');

const equipment: Equipment = {
  id: 0,
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

describe('equipment: createEquipmentConfirmed', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls addEquipment with the provided equipment', async () => {
    await createEquipmentConfirmed(equipment).catch(() => {});
    expect(addEquipment).toHaveBeenCalledExactlyOnceWith(equipment);
  });

  describe('when addEquipment succeeds', () => {
    beforeEach(() => {
      (addEquipment as Mock).mockResolvedValue({ ...equipment, id: 42 });
    });

    it('redirects to /adventure/equipment', async () => {
      await createEquipmentConfirmed(equipment).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/equipment');
    });
  });

  describe('when addEquipment fails', () => {
    beforeEach(() => {
      (addEquipment as Mock).mockResolvedValue(null);
    });

    it('redirects to /error', async () => {
      await createEquipmentConfirmed(equipment).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
