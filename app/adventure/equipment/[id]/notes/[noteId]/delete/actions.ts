'use server';

import { deleteNote } from '@/app/adventure/notes/data';
import { Note } from '@/models';
import { redirectToDetails } from '@/utils/navigation';
import { redirect } from 'next/navigation';

export const deleteConfirmed = async (equipmentId: number, n: Note) => {
  if (await deleteNote(n)) {
    redirectToDetails('equipment', equipmentId, 'Notes');
  } else {
    redirect('/error');
  }
};

export const deleteAborted = async (equipmentId: number) => {
  redirectToDetails('equipment', equipmentId, 'Notes');
};
