'use server';

import { Equipment } from '@/models';
import { redirect } from 'next/navigation';
import { updateEquipment } from '../../data';

export const updateConfirmed = async (eq: Equipment) => {
  if (await updateEquipment(eq)) {
    redirect('/adventure/equipment');
  } else {
    redirect('/error');
  }
};
