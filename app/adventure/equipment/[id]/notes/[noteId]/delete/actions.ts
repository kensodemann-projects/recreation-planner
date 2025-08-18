'use server';

import { deleteNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirect } from 'next/navigation';

export const deleteConfirmed = async (equipmentId: number, n: Note) => {
  await deleteNote(n);
  redirect(`/adventure/equipment/${equipmentId}`);
};

export const deleteAborted = async (equipmentId: number) => {
  redirect(`/adventure/equipment/${equipmentId}`);
};
