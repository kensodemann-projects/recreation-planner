'use server';

import { addNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirect } from 'next/navigation';
import { redirectToEquipmentDetails } from '../utils';

export const createConfirmed = async (note: Note) => {
  if (await addNote(note)) {
    redirectToEquipmentDetails(note.equipmentRid!);
  } else {
    redirect('/error');
  }
};
