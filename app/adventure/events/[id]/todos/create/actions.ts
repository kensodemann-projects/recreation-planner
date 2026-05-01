'use server';

import { addTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirectToDetails } from '@/utils/navigation';
import { redirect } from 'next/navigation';

export const createConfirmed = async (collection: TodoCollection) => {
  if (await addTodoCollection(collection)) {
    redirectToDetails('events', collection.eventRid!, 'Todos');
  } else {
    redirect('/error');
  }
};
