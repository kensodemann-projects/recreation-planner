'use server';

import { EquipmentEvent } from '@/models';
import { redirect } from 'next/navigation';
import { addEquipmentEvent } from '../../../data';

export const createConfirmed = async (equipmentEvent: EquipmentEvent) => {
  if (await addEquipmentEvent(equipmentEvent)) {
    redirect(`/adventure/equipment/${equipmentEvent.equipment.id}`);
  } else {
    redirect('/error');
  }
};
