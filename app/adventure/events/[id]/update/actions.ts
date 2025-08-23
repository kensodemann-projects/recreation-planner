'use server';

import { Event } from '@/models';
import { getHref } from '@/utils/get-href';
import { redirect } from 'next/navigation';
import { updateEvent } from '../../data';

export const updateConfirmed = async (e: Event, callingPage: string) => {
  if (await updateEvent(e)) {
    redirect(getHref(callingPage, '/adventure/events'));
  } else {
    redirect('/error');
  }
};
