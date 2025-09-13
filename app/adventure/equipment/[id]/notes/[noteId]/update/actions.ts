'use server';

import { updateNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirect } from 'next/navigation';
import { redirectToEquipmentDetails } from '../../utils';

export const updateConfirmed = async (note: Note) => {
  if (await updateNote(note)) {
    redirectToEquipmentDetails(note.equipmentRid!);
  } else {
    redirect('/error');
  }
};
