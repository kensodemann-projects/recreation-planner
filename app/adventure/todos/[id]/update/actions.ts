'use server';

import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { updateTodoCollection } from '../../data';

export const updateTodoCollectionConfirmed = async (c: TodoCollection) => {
  if (await updateTodoCollection(c)) {
    redirect('/adventure/todos');
  } else {
    redirect('/error');
  }
};
