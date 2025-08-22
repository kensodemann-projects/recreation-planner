'use server';

import { deleteNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirect } from 'next/navigation';

export const deleteConfirmed = async (placeId: number, n: Note) => {
  await deleteNote(n);
  redirect(`/adventure/places/${placeId}`);
};

export const deleteAborted = async (placeId: number) => {
  redirect(`/adventure/places/${placeId}`);
};
