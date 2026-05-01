'use server';

import { MaintenanceItem } from '@/models';
import { redirectToDetails } from '@/utils/navigation';
import { redirect } from 'next/navigation';
import { addMaintenanceItem } from '../../../data';

export const createConfirmed = async (maintenanceItem: MaintenanceItem) => {
  if (await addMaintenanceItem(maintenanceItem)) {
    redirectToDetails('equipment', maintenanceItem.equipmentRid, 'Maintenance');
  } else {
    redirect('/error');
  }
};
