'use server';

import { updateNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirect } from 'next/navigation';

export const updateConfirmed = async (note: Note) => {
  if (await updateNote(note)) {
    redirect(`/adventure/events/${note.eventRid}`);
  } else {
    redirect('/error');
  }
};
