'use server';

import { deleteNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirect } from 'next/navigation';
import { redirectToEquipmentDetails } from '../../utils';

export const deleteConfirmed = async (equipmentId: number, n: Note) => {
  if (await deleteNote(n)) {
    redirectToEquipmentDetails(equipmentId);
  } else {
    redirect('/error');
  }
};

export const deleteAborted = async (equipmentId: number) => {
  redirectToEquipmentDetails(equipmentId);
};
