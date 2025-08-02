'use server';

import { deleteTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';

export const deleteConfirmed = async (eventId: number, c: TodoCollection) => {
  await deleteTodoCollection(c);
  redirect(`/adventure/events/${eventId}`);
};

export const deleteAborted = async (eventId: number) => {
  redirect(`/adventure/events/${eventId}`);
};
