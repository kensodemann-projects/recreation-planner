'use server';

import { Event } from '@/models';
import { redirect } from 'next/navigation';
import { deleteEvent } from '../../data';
import { getHref } from '@/utils/get-href';

export const deleteConfirmed = async (e: Event, callingPage: string) => {
  await deleteEvent(e);
  redirect(getHref(callingPage, '/adventure/events'));
};

export const deleteAborted = async (callingPage: string) => {
  redirect(getHref(callingPage, '/adventure/events'));
};
