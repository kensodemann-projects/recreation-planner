'use client';

import { MaintenanceItem, MaintenanceType, UsageUnits } from '@/models';
import { redirectToDetails } from '@/utils/navigation';
import MaintenanceItemEditor from '../../ui/maintenance-item-editor';
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
        onCancel={() => redirectToDetails('equipment', maintenanceItem.equipmentRid, 'Maintenance')}
      />
    </>
  );
};

export default UpdateMaintenanceItem;
