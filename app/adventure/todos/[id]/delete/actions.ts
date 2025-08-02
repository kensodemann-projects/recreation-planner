'use server';

import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { deleteTodoCollection } from '../../data';

export const deleteConfirmed = async (c: TodoCollection) => {
  await deleteTodoCollection(c);
  redirect('/adventure/todos');
};

export const deleteAborted = async () => {
  redirect('/adventure/todos');
};
