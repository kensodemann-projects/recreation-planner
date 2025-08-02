'use server';

import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { addTodoCollection } from '../data';

export const createConfirmed = async (collection: TodoCollection) => {
  if (await addTodoCollection(collection)) {
    redirect('/adventure/todos');
  } else {
    redirect('/error');
  }
};
