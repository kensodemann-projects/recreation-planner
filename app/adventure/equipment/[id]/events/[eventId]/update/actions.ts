'use server';

import { updateEquipmentEvent } from '@/app/adventure/equipment/data';
import { EquipmentEvent } from '@/models';
import { redirect } from 'next/navigation';

export const updateConfirmed = async (equipmentEvent: EquipmentEvent) => {
  if (await updateEquipmentEvent(equipmentEvent)) {
    redirect(`/adventure/equipment/${equipmentEvent.equipment.id}`);
  } else {
    redirect('/error');
  }
};
