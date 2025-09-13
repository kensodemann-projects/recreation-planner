'use server';

import { deleteNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirectToEventDetails } from '../../utils';

export const deleteConfirmed = async (eventId: number, n: Note) => {
  await deleteNote(n);
  redirectToEventDetails(eventId);
};

export const deleteAborted = async (eventId: number) => {
  redirectToEventDetails(eventId);
};
