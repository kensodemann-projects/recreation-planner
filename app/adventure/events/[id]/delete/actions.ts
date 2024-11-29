'use server';

import { Event } from '@/models';
import { redirect } from 'next/navigation';
import { deleteEvent } from '../../data';

export const deleteEventConfirmed = async (e: Event) => {
  await deleteEvent(e);
  redirect('/adventure/events');
};

export const deleteEventAborted = async () => {
  redirect('/adventure/events');
};
