'use server';

import { updateNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirect } from 'next/navigation';
import { redirectToEventDetails } from '../../utils';

export const updateConfirmed = async (note: Note) => {
  if (await updateNote(note)) {
    redirectToEventDetails(note.eventRid!);
  } else {
    redirect('/error');
  }
};
