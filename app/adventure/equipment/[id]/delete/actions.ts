'use server';

import { Equipment } from '@/models';
import { redirect } from 'next/navigation';
import { deleteEquipment } from '../../data';

export const deleteEquipmentConfirmed = async (e: Equipment) => {
  await deleteEquipment(e);
  redirect('/adventure/equipment');
};

export const deleteEquipmentAborted = async () => {
  redirect('/adventure/equipment');
};
