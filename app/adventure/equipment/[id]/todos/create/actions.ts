'use server';

import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { addTodoCollection } from '@/app/adventure/todos/data';
import { redirectToEquipmentDetails } from '../utils';

export const createConfirmed = async (collection: TodoCollection) => {
  if (await addTodoCollection(collection)) {
    redirectToEquipmentDetails(collection.equipmentRid!);
  } else {
    redirect('/error');
  }
};
