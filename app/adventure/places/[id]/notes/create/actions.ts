'use server';

import { addNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirect } from 'next/navigation';

export const createConfirmed = async (note: Note) => {
  if (await addNote(note)) {
    redirect(`/adventure/places/${note.placeRid}`);
  } else {
    redirect('/error');
  }
};
