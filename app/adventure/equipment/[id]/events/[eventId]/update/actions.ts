'use server';

import { updateEquipmentEvent } from '@/app/adventure/equipment/data';
import { EquipmentEvent } from '@/models';
import { redirect } from 'next/navigation';
import { redirectToEquipmentDetails } from '../../utils';

export const updateConfirmed = async (equipmentEvent: EquipmentEvent) => {
  if (await updateEquipmentEvent(equipmentEvent)) {
    redirectToEquipmentDetails(equipmentEvent.equipmentRid);
  } else {
    redirect('/error');
  }
};
