'use server';

import { addNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirectToDetails } from '@/utils/navigation';
import { redirect } from 'next/navigation';

export const createConfirmed = async (note: Note) => {
  if (await addNote(note)) {
    redirectToDetails('events', note.eventRid!, 'Notes');
  } else {
    redirect('/error');
  }
};
