'use server';

import { addNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirect } from 'next/navigation';
import { redirectToEventDetails } from '../utils';

export const createConfirmed = async (note: Note) => {
  if (await addNote(note)) {
    redirectToEventDetails(note.eventRid!);
  } else {
    redirect('/error');
  }
};
