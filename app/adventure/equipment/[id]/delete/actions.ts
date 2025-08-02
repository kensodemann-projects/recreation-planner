'use server';

import { Equipment } from '@/models';
import { redirect } from 'next/navigation';
import { deleteEquipment } from '../../data';

export const deleteConfirmed = async (e: Equipment) => {
  await deleteEquipment(e);
  redirect('/adventure/equipment');
};

export const deleteAborted = async () => {
  redirect('/adventure/equipment');
};
