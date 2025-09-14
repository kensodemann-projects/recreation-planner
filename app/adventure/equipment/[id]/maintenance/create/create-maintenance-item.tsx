'use client';

import { Equipment, MaintenanceType, UsageUnits } from '@/models';
import MaintenanceItemEditor from '../ui/maintenance-item-editor';
import { redirectToEquipmentDetails } from '../utils';
import { createConfirmed } from './actions';

type CreateMaintenanceItemProperties = {
  equipment: Equipment;
  maintenanceTypes: MaintenanceType[];
  usageUnits: UsageUnits[];
};

const CreateMaintenanceItem = ({ equipment, maintenanceTypes, usageUnits }: CreateMaintenanceItemProperties) => {
  return (
    <>
      <MaintenanceItemEditor
        maintenanceTypes={maintenanceTypes}
        usageUnits={usageUnits}
        onConfirm={(evt) => createConfirmed({ ...evt, equipmentRid: equipment.id! })}
        onCancel={() => redirectToEquipmentDetails(equipment.id!)}
      />
    </>
  );
};

export default CreateMaintenanceItem;
