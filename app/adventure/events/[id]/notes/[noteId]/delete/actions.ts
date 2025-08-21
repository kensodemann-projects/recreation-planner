'use server';

import { deleteNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirect } from 'next/navigation';

export const deleteConfirmed = async (eventId: number, n: Note) => {
  await deleteNote(n);
  redirect(`/adventure/events/${eventId}`);
};

export const deleteAborted = async (eventId: number) => {
  redirect(`/adventure/events/${eventId}`);
};
