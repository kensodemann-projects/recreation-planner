'use server';

import { MaintenanceItem } from '@/models';
import { redirect } from 'next/navigation';
import { addMaintenanceItem } from '../../../data';
import { redirectToEquipmentDetails } from '../utils';

export const createConfirmed = async (maintenanceItem: MaintenanceItem) => {
  if (await addMaintenanceItem(maintenanceItem)) {
    redirectToEquipmentDetails(maintenanceItem.equipmentRid);
  } else {
    redirect('/error');
  }
};
