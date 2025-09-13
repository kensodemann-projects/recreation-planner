'use server';

import { deleteTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirectToEventDetails } from '../../utils';

export const deleteConfirmed = async (eventId: number, c: TodoCollection) => {
  await deleteTodoCollection(c);
  redirectToEventDetails(eventId);
};

export const deleteAborted = async (eventId: number) => {
  redirectToEventDetails(eventId);
};
