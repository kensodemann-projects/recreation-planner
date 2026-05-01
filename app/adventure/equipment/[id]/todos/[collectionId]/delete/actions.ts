'use server';

import { deleteTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirectToDetails } from '@/utils/navigation';
import { redirect } from 'next/navigation';

export const deleteConfirmed = async (equipmentId: number, c: TodoCollection) => {
  if (await deleteTodoCollection(c)) {
    redirectToDetails('equipment', equipmentId, 'Todos');
  } else {
    redirect('/error');
  }
};

export const deleteAborted = async (equipmentId: number) => {
  redirectToDetails('equipment', equipmentId, 'Todos');
};
