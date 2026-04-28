'use server';

import { deleteTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { redirectToEventDetails } from '../../utils';

export const deleteConfirmed = async (eventId: number, c: TodoCollection) => {
  if (await deleteTodoCollection(c)) {
    redirectToEventDetails(eventId);
  } else {
    redirect('/error');
  }
};

export const deleteAborted = async (eventId: number) => {
  redirectToEventDetails(eventId);
};
