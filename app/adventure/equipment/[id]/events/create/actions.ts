'use server';

import { EquipmentEvent } from '@/models';
import { redirect } from 'next/navigation';
import { addEquipmentEvent } from '../../../data';

export const createEquipmentEventConfirmed = async (equipmentEvent: EquipmentEvent) => {
  if (await addEquipmentEvent(equipmentEvent)) {
    redirect(`/adventure/equipment/${equipmentEvent.equipmentRid}`);
  } else {
    redirect('/error');
  }
};
