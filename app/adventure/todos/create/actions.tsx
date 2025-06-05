'use server';

import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';

export const createTodoCollectionConfirmed = async (collection: TodoCollection) => {
  redirect('/adventure/todos');
  // if (/* do the saves here */) {
  //   redirect('/adventure/todos');
  // } else {
  //   redirect('/error');
  // }
};
