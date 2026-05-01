'use server';

import { deleteTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirectToDetails } from '@/utils/navigation';
import { redirect } from 'next/navigation';

export const deleteConfirmed = async (eventId: number, c: TodoCollection) => {
  if (await deleteTodoCollection(c)) {
    redirectToDetails('events', eventId, 'Todos');
  } else {
    redirect('/error');
  }
};

export const deleteAborted = async (eventId: number) => {
  redirectToDetails('events', eventId, 'Todos');
};
