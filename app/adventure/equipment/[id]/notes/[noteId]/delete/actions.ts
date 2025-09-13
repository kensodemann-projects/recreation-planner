'use server';

import { deleteNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirectToEquipmentDetails } from '../../utils';

export const deleteConfirmed = async (equipmentId: number, n: Note) => {
  await deleteNote(n);
  redirectToEquipmentDetails(equipmentId);
};

export const deleteAborted = async (equipmentId: number) => {
  redirectToEquipmentDetails(equipmentId);
};
