'use server';

import { updateMaintenanceItem } from '@/app/adventure/equipment/data';
import { MaintenanceItem } from '@/models';
import { redirect } from 'next/navigation';
import { redirectToEquipmentDetails } from '../../utils';

export const updateConfirmed = async (maintenanceItem: MaintenanceItem) => {
  if (await updateMaintenanceItem(maintenanceItem)) {
    redirectToEquipmentDetails(maintenanceItem.equipmentRid);
  } else {
    redirect('/error');
  }
};
