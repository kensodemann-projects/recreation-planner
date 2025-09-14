'use client';

import { MaintenanceItem, MaintenanceType, UsageUnits } from '@/models';
import MaintenanceItemEditor from '../../ui/maintenance-item-editor';
import { redirectToEquipmentDetails } from '../../utils';
import { updateConfirmed } from './actions';

type UpdateMaintenanceItemProperties = {
  maintenanceItem: MaintenanceItem;
  maintenanceTypes: MaintenanceType[];
  usageUnits: UsageUnits[];
};

const UpdateMaintenanceItem = ({ maintenanceItem, maintenanceTypes, usageUnits }: UpdateMaintenanceItemProperties) => {
  return (
    <>
      <MaintenanceItemEditor
        maintenanceItem={maintenanceItem}
        maintenanceTypes={maintenanceTypes}
        usageUnits={usageUnits}
        onConfirm={(evt) => updateConfirmed(evt as MaintenanceItem)}
        onCancel={() => redirectToEquipmentDetails(maintenanceItem.equipmentRid)}
      />
    </>
  );
};

export default UpdateMaintenanceItem;
