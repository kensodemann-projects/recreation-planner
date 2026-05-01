'use server';

import { updateTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirectToDetails } from '@/utils/navigation';
import { redirect } from 'next/navigation';

export const updateConfirmed = async (collection: TodoCollection) => {
  if (await updateTodoCollection(collection)) {
    redirectToDetails('events', collection.eventRid!, 'Todos');
  } else {
    redirect('/error');
  }
};
