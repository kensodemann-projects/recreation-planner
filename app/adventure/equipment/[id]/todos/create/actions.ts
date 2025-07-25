'use server';

import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { addTodoCollection } from '@/app/adventure/todos/data';

export const createTodoCollectionConfirmed = async (collection: TodoCollection) => {
  if (await addTodoCollection(collection)) {
    redirect(`/adventure/equipment/${collection.equipmentRid}`);
  } else {
    redirect('/error');
  }
};
