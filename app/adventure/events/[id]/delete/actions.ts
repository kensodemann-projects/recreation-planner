'use server';

import { Event } from '@/models';
import { redirect } from 'next/navigation';
import { deleteEvent } from '../../data';

export const deleteConfirmed = async (e: Event) => {
  await deleteEvent(e);
  redirect('/adventure/events');
};

export const deleteAborted = async () => {
  redirect('/adventure/events');
};
