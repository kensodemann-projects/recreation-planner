'use server';

import { updateTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { redirectToEventDetails } from '../../utils';

export const updateConfirmed = async (collection: TodoCollection) => {
  if (await updateTodoCollection(collection)) {
    redirectToEventDetails(collection.eventRid!);
  } else {
    redirect('/error');
  }
};
