'use server';

import { updateTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';

export const updateConfirmed = async (collection: TodoCollection) => {
  if (await updateTodoCollection(collection)) {
    redirect(`/adventure/equipment/${collection.equipmentRid}`);
  } else {
    redirect('/error');
  }
};
