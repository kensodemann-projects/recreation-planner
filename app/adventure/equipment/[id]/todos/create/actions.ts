'use server';

import { addTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirectToDetails } from '@/utils/navigation';
import { redirect } from 'next/navigation';

export const createConfirmed = async (collection: TodoCollection) => {
  if (await addTodoCollection(collection)) {
    redirectToDetails('equipment', collection.equipmentRid!, 'Todos');
  } else {
    redirect('/error');
  }
};
