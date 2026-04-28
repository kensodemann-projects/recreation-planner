'use server';

import { Equipment } from '@/models';
import { redirect } from 'next/navigation';
import { deleteEquipment } from '../../data';

export const deleteConfirmed = async (e: Equipment) => {
  if (await deleteEquipment(e)) {
    redirect('/adventure/equipment');
  } else {
    redirect('/error');
  }
};

export const deleteAborted = async () => {
  redirect('/adventure/equipment');
};
