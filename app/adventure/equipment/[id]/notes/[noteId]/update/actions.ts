'use server';

import { updateNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirectToDetails } from '@/utils/navigation';
import { redirect } from 'next/navigation';

export const updateConfirmed = async (note: Note) => {
  if (await updateNote(note)) {
    redirectToDetails('equipment', note.equipmentRid!, 'Notes');
  } else {
    redirect('/error');
  }
};
