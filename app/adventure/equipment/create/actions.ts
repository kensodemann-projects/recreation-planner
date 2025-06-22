'use server';

import { Equipment } from '@/models';
import { redirect } from 'next/navigation';
import { addEquipment } from '../data';

export const createEquipmentConfirmed = async (equipment: Equipment) => {
  if (await addEquipment(equipment)) {
    redirect('/adventure/equipment');
  } else {
    redirect('/error');
  }
};
