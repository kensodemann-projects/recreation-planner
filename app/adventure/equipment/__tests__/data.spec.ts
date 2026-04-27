import { buildChainableMock, setLoggedIn, setLoggedOut } from '@/test-utils/data-helpers';
import { executeQuery } from '@/utils/data';
import { createClient } from '@/utils/supabase/server';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import {
  addEquipment,
  addMaintenanceItem,
  canDeleteEquipment,
  canDeleteMaintenanceItem,
  deleteEquipment,
  deleteMaintenanceItem,
  fetchAllEquipment,
  fetchEquipment,
  fetchEquipmentTypes,
  fetchMaintenanceItem,
  fetchMaintenanceTypes,
  fetchUsageUnits,
  updateEquipment,
  updateMaintenanceItem,
} from '../data';

vi.mock('@/utils/supabase/server');
vi.mock('@/utils/data', () => ({ executeQuery: vi.fn() }));

// --- Test data ---

const equipmentTypeDTO = { id: 2, name: 'Automobile', description: 'A car or truck' };

const equipmentDTO = {
  id: 1,
  name: 'Test Truck',
  description: 'A test vehicle',
  purchase_date: '2014-11-27',
  cost: 24584.34,
  manufacturer: 'Ford',
  model: 'Maverick',
  identification: 'test-vin',
  length: null,
  weight: null,
  capacity: null,
  license_plate_number: null,
  insurance_carrier: null,
  insurance_policy_number: null,
  insurance_contact_name: null,
  insurance_contact_phone_number: null,
  insurance_contact_email: null,
  equipment_type_rid: 2,
  equipment_types: equipmentTypeDTO,
};

const equipment = {
  id: 1,
  name: 'Test Truck',
  description: 'A test vehicle',
  purchaseDate: '2014-11-27',
  cost: 24584.34,
  manufacturer: 'Ford',
  model: 'Maverick',
  identification: 'test-vin',
  length: null,
  weight: null,
  capacity: null,
  licensePlateNumber: null,
  insuranceCarrier: null,
  insurancePolicyNumber: null,
  insuranceContactName: null,
  insuranceContactPhoneNumber: null,
  insuranceContactEmail: null,
  equipmentType: { id: 2, name: 'Automobile', description: 'A car or truck' },
};

const maintenanceTypeDTO = { id: 2, name: 'Periodic Maintenance', description: 'Oil change etc.' };
const usageUnitsDTO = { id: 1, name: 'Miles' };

const maintenanceItemDTO = {
  id: 5,
  name: 'Oil Change',
  description: null,
  date: '2025-08-15',
  cost: 123.43,
  usage: 12834.3,
  usage_units_rid: 1,
  usage_units: usageUnitsDTO,
  maintenance_type_rid: 2,
  maintenance_types: maintenanceTypeDTO,
  equipment_rid: 1,
};

const maintenanceItem = {
  id: 5,
  name: 'Oil Change',
  description: null,
  date: '2025-08-15',
  cost: 123.43,
  usage: 12834.3,
  usageUnits: { id: 1, name: 'Miles' },
  maintenanceType: { id: 2, name: 'Periodic Maintenance', description: 'Oil change etc.' },
  equipmentRid: 1,
};

// --- Tests ---

describe('equipment data', () => {
  let mockFrom: Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    const chain = buildChainableMock();
    mockFrom = vi.fn().mockReturnValue(chain);
    const client = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(createClient).mockReturnValue({ ...client, from: mockFrom } as any);
    vi.clearAllMocks();
  });

  // ---------------------------------------------------------------------------
  // fetchAllEquipment
  // ---------------------------------------------------------------------------

  describe('fetchAllEquipment', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns an empty array', async () => {
        expect(await fetchAllEquipment()).toEqual([]);
      });

      it('does not access the database', async () => {
        await fetchAllEquipment();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue([equipmentDTO]);
        });

        it('calls executeQuery', async () => {
          await fetchAllEquipment();
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the equipment table', async () => {
          await fetchAllEquipment();
          expect(mockFrom).toHaveBeenCalledWith('equipment');
        });

        it('returns the converted equipment list', async () => {
          expect(await fetchAllEquipment()).toEqual([equipment]);
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns an empty array', async () => {
          expect(await fetchAllEquipment()).toEqual([]);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // fetchEquipment
  // ---------------------------------------------------------------------------

  describe('fetchEquipment', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns null', async () => {
        expect(await fetchEquipment(1)).toBeNull();
      });

      it('does not access the database', async () => {
        await fetchEquipment(1);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(equipmentDTO);
        });

        it('calls executeQuery', async () => {
          await fetchEquipment(1);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the equipment table', async () => {
          await fetchEquipment(1);
          expect(mockFrom).toHaveBeenCalledWith('equipment');
        });

        it('returns the converted equipment', async () => {
          expect(await fetchEquipment(1)).toEqual(equipment);
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns null', async () => {
          expect(await fetchEquipment(1)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // addEquipment
  // ---------------------------------------------------------------------------

  describe('addEquipment', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns null', async () => {
        expect(await addEquipment(equipment)).toBeNull();
      });

      it('does not access the database', async () => {
        await addEquipment(equipment);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when the insert succeeds', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(equipmentDTO);
        });

        it('calls executeQuery', async () => {
          await addEquipment(equipment);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('inserts into the equipment table', async () => {
          await addEquipment(equipment);
          expect(mockFrom).toHaveBeenCalledWith('equipment');
        });

        it('returns the converted equipment', async () => {
          expect(await addEquipment(equipment)).toEqual(equipment);
        });
      });

      describe('when the insert fails', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns null', async () => {
          expect(await addEquipment(equipment)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // canDeleteEquipment
  // ---------------------------------------------------------------------------

  describe('canDeleteEquipment', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns false', async () => {
        expect(await canDeleteEquipment(equipment)).toBe(false);
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      it('returns true', async () => {
        expect(await canDeleteEquipment(equipment)).toBe(true);
      });
    });
  });

  // ---------------------------------------------------------------------------
  // deleteEquipment
  // ---------------------------------------------------------------------------

  describe('deleteEquipment', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('does not access the database', async () => {
        await deleteEquipment(equipment);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        setLoggedIn();
        (executeQuery as Mock).mockResolvedValue(null);
      });

      it('calls executeQuery', async () => {
        await deleteEquipment(equipment);
        expect(executeQuery).toHaveBeenCalledOnce();
      });

      it('deletes from the equipment table', async () => {
        await deleteEquipment(equipment);
        expect(mockFrom).toHaveBeenCalledWith('equipment');
      });
    });
  });

  // ---------------------------------------------------------------------------
  // updateEquipment
  // ---------------------------------------------------------------------------

  describe('updateEquipment', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns null', async () => {
        expect(await updateEquipment(equipment)).toBeNull();
      });

      it('does not access the database', async () => {
        await updateEquipment(equipment);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when the update succeeds', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(equipmentDTO);
        });

        it('calls executeQuery', async () => {
          await updateEquipment(equipment);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('updates the equipment table', async () => {
          await updateEquipment(equipment);
          expect(mockFrom).toHaveBeenCalledWith('equipment');
        });

        it('returns the converted equipment', async () => {
          expect(await updateEquipment(equipment)).toEqual(equipment);
        });
      });

      describe('when the update fails', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns null', async () => {
          expect(await updateEquipment(equipment)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // fetchEquipmentTypes
  // ---------------------------------------------------------------------------

  describe('fetchEquipmentTypes', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns an empty array', async () => {
        expect(await fetchEquipmentTypes()).toEqual([]);
      });

      it('does not access the database', async () => {
        await fetchEquipmentTypes();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue([equipmentTypeDTO]);
        });

        it('calls executeQuery', async () => {
          await fetchEquipmentTypes();
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the equipment_types table', async () => {
          await fetchEquipmentTypes();
          expect(mockFrom).toHaveBeenCalledWith('equipment_types');
        });

        it('returns the converted equipment types', async () => {
          expect(await fetchEquipmentTypes()).toEqual([{ id: 2, name: 'Automobile', description: 'A car or truck' }]);
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns an empty array', async () => {
          expect(await fetchEquipmentTypes()).toEqual([]);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // fetchMaintenanceItem
  // ---------------------------------------------------------------------------

  describe('fetchMaintenanceItem', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns null', async () => {
        expect(await fetchMaintenanceItem(5)).toBeNull();
      });

      it('does not access the database', async () => {
        await fetchMaintenanceItem(5);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(maintenanceItemDTO);
        });

        it('calls executeQuery', async () => {
          await fetchMaintenanceItem(5);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the maintenance_items table', async () => {
          await fetchMaintenanceItem(5);
          expect(mockFrom).toHaveBeenCalledWith('maintenance_items');
        });

        it('returns the converted maintenance item', async () => {
          expect(await fetchMaintenanceItem(5)).toEqual(maintenanceItem);
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns null', async () => {
          expect(await fetchMaintenanceItem(5)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // addMaintenanceItem
  // ---------------------------------------------------------------------------

  describe('addMaintenanceItem', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns null', async () => {
        expect(await addMaintenanceItem(maintenanceItem)).toBeNull();
      });

      it('does not access the database', async () => {
        await addMaintenanceItem(maintenanceItem);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when the insert succeeds', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(maintenanceItemDTO);
        });

        it('calls executeQuery', async () => {
          await addMaintenanceItem(maintenanceItem);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('inserts into the maintenance_items table', async () => {
          await addMaintenanceItem(maintenanceItem);
          expect(mockFrom).toHaveBeenCalledWith('maintenance_items');
        });

        it('returns the converted maintenance item', async () => {
          expect(await addMaintenanceItem(maintenanceItem)).toEqual(maintenanceItem);
        });
      });

      describe('when the insert fails', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns null', async () => {
          expect(await addMaintenanceItem(maintenanceItem)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // canDeleteMaintenanceItem
  // ---------------------------------------------------------------------------

  describe('canDeleteMaintenanceItem', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns false', async () => {
        expect(await canDeleteMaintenanceItem(maintenanceItem)).toBe(false);
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      it('returns true', async () => {
        expect(await canDeleteMaintenanceItem(maintenanceItem)).toBe(true);
      });
    });
  });

  // ---------------------------------------------------------------------------
  // deleteMaintenanceItem
  // ---------------------------------------------------------------------------

  describe('deleteMaintenanceItem', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('does not access the database', async () => {
        await deleteMaintenanceItem(maintenanceItem);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => {
        setLoggedIn();
        (executeQuery as Mock).mockResolvedValue(null);
      });

      it('calls executeQuery', async () => {
        await deleteMaintenanceItem(maintenanceItem);
        expect(executeQuery).toHaveBeenCalledOnce();
      });

      it('deletes from the maintenance_items table', async () => {
        await deleteMaintenanceItem(maintenanceItem);
        expect(mockFrom).toHaveBeenCalledWith('maintenance_items');
      });
    });
  });

  // ---------------------------------------------------------------------------
  // updateMaintenanceItem
  // ---------------------------------------------------------------------------

  describe('updateMaintenanceItem', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns null', async () => {
        expect(await updateMaintenanceItem(maintenanceItem)).toBeNull();
      });

      it('does not access the database', async () => {
        await updateMaintenanceItem(maintenanceItem);
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when the update succeeds', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(maintenanceItemDTO);
        });

        it('calls executeQuery', async () => {
          await updateMaintenanceItem(maintenanceItem);
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('updates the maintenance_items table', async () => {
          await updateMaintenanceItem(maintenanceItem);
          expect(mockFrom).toHaveBeenCalledWith('maintenance_items');
        });

        it('returns the converted maintenance item', async () => {
          expect(await updateMaintenanceItem(maintenanceItem)).toEqual(maintenanceItem);
        });
      });

      describe('when the update fails', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns null', async () => {
          expect(await updateMaintenanceItem(maintenanceItem)).toBeNull();
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // fetchMaintenanceTypes
  // ---------------------------------------------------------------------------

  describe('fetchMaintenanceTypes', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns an empty array', async () => {
        expect(await fetchMaintenanceTypes()).toEqual([]);
      });

      it('does not access the database', async () => {
        await fetchMaintenanceTypes();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue([maintenanceTypeDTO]);
        });

        it('calls executeQuery', async () => {
          await fetchMaintenanceTypes();
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the maintenance_types table', async () => {
          await fetchMaintenanceTypes();
          expect(mockFrom).toHaveBeenCalledWith('maintenance_types');
        });

        it('returns the converted maintenance types', async () => {
          expect(await fetchMaintenanceTypes()).toEqual([
            { id: 2, name: 'Periodic Maintenance', description: 'Oil change etc.' },
          ]);
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns an empty array', async () => {
          expect(await fetchMaintenanceTypes()).toEqual([]);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------
  // fetchUsageUnits
  // ---------------------------------------------------------------------------

  describe('fetchUsageUnits', () => {
    describe('when not logged in', () => {
      beforeEach(() => setLoggedOut());

      it('returns an empty array', async () => {
        expect(await fetchUsageUnits()).toEqual([]);
      });

      it('does not access the database', async () => {
        await fetchUsageUnits();
        expect(executeQuery).not.toHaveBeenCalled();
      });
    });

    describe('when logged in', () => {
      beforeEach(() => setLoggedIn());

      describe('when data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue([usageUnitsDTO]);
        });

        it('calls executeQuery', async () => {
          await fetchUsageUnits();
          expect(executeQuery).toHaveBeenCalledOnce();
        });

        it('queries the usage_units table', async () => {
          await fetchUsageUnits();
          expect(mockFrom).toHaveBeenCalledWith('usage_units');
        });

        it('returns the converted usage units', async () => {
          expect(await fetchUsageUnits()).toEqual([{ id: 1, name: 'Miles' }]);
        });
      });

      describe('when no data is returned', () => {
        beforeEach(() => {
          (executeQuery as Mock).mockResolvedValue(null);
        });

        it('returns an empty array', async () => {
          expect(await fetchUsageUnits()).toEqual([]);
        });
      });
    });
  });
});
