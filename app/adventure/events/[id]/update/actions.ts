'use server';

import { Event } from '@/models';
import { redirect } from 'next/navigation';
import { updateEvent } from '../../data';

export const updateEventConfirmed = async (e: Event) => {
  if (await updateEvent(e)) {
    redirect('/adventure/events');
  } else {
    redirect('/error');
  }
};
