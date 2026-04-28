'use server';

import { deleteNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirect } from 'next/navigation';
import { redirectToEventDetails } from '../../utils';

export const deleteConfirmed = async (eventId: number, n: Note) => {
  if (await deleteNote(n)) {
    redirectToEventDetails(eventId);
  } else {
    redirect('/error');
  }
};

export const deleteAborted = async (eventId: number) => {
  redirectToEventDetails(eventId);
};
