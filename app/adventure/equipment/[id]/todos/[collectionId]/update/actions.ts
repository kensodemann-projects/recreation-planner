'use server';

import { updateTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { redirectToEquipmentDetails } from '../../utils';

export const updateConfirmed = async (collection: TodoCollection) => {
  if (await updateTodoCollection(collection)) {
    redirectToEquipmentDetails(collection.equipmentRid!);
  } else {
    redirect('/error');
  }
};
