'use server';

import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { addTodoCollection } from '@/app/adventure/todos/data';

export const createTodoCollectionConfirmed = async (collection: TodoCollection) => {
  if (await addTodoCollection(collection)) {
    redirect(`/adventure/events/${collection.eventRid}`);
  } else {
    redirect('/error');
  }
};
