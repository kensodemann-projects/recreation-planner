'use server';

import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { deleteTodoCollection } from '../../data';
import { getHref } from '@/utils/get-href';

export const deleteConfirmed = async (c: TodoCollection, callingPage: string) => {
  if (await deleteTodoCollection(c)) {
    redirect(getHref(callingPage, '/adventure/todos'));
  } else {
    redirect('/error');
  }
};

export const deleteAborted = async (callingPage: string) => {
  redirect(getHref(callingPage, '/adventure/todos'));
};
