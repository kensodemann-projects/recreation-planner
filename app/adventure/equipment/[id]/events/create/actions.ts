'use server';

import { EquipmentEvent } from '@/models';
import { redirect } from 'next/navigation';
import { addEquipmentEvent } from '../../../data';
import { redirectToEquipmentDetails } from '../utils';

export const createConfirmed = async (equipmentEvent: EquipmentEvent) => {
  if (await addEquipmentEvent(equipmentEvent)) {
    redirectToEquipmentDetails(equipmentEvent.equipmentRid);
  } else {
    redirect('/error');
  }
};
