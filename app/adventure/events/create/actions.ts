'use server';

import { Event } from '@/models';
import { redirect } from 'next/navigation';
import { addEvent } from '../data';

export const createEventConfirmed = async (evt: Event) => {
  if (await addEvent(evt)) {
    redirect('/adventure/events');
  } else {
    redirect('/error');
  }
};
