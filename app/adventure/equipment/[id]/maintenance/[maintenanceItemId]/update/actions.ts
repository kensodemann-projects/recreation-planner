'use server';

import { updateMaintenanceItem } from '@/app/adventure/equipment/data';
import { MaintenanceItem } from '@/models';
import { redirectToDetails } from '@/utils/navigation';
import { redirect } from 'next/navigation';

export const updateConfirmed = async (maintenanceItem: MaintenanceItem) => {
  if (await updateMaintenanceItem(maintenanceItem)) {
    redirectToDetails('equipment', maintenanceItem.equipmentRid, 'Maintenance');
  } else {
    redirect('/error');
  }
};
