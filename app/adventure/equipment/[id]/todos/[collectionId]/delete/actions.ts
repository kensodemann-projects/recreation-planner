'use server';

import { deleteTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';

export const deleteConfirmed = async (equipmentId: number, c: TodoCollection) => {
  await deleteTodoCollection(c);
  redirect(`/adventure/equipment/${equipmentId}`);
};

export const deleteAborted = async (equipmentId: number) => {
  redirect(`/adventure/equipment/${equipmentId}`);
};
