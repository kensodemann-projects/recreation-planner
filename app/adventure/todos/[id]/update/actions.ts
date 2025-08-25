'use server';

import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { updateTodoCollection } from '../../data';
import { getHref } from '@/utils/get-href';

export const updateConfirmed = async (c: TodoCollection, callingPage: string) => {
  if (await updateTodoCollection(c)) {
    redirect(getHref(callingPage, '/adventure/todos'));
  } else {
    redirect('/error');
  }
};
