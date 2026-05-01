'use server';

import { deleteNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirectToDetails } from '@/utils/navigation';
import { redirect } from 'next/navigation';

export const deleteConfirmed = async (eventId: number, n: Note) => {
  if (await deleteNote(n)) {
    redirectToDetails('events', eventId, 'Notes');
  } else {
    redirect('/error');
  }
};

export const deleteAborted = async (eventId: number) => {
  redirectToDetails('events', eventId, 'Notes');
};
