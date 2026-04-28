'use server';

import { ItineraryItem } from '@/models';
import { redirect } from 'next/navigation';
import { deleteItineraryItem } from '../../data';
import { redirectToEventDetails } from '../../utils';

export const deleteConfirmed = async (eventId: number, i: ItineraryItem) => {
  if (await deleteItineraryItem(i)) {
    redirectToEventDetails(eventId);
  } else {
    redirect('/error');
  }
};

export const deleteAborted = async (eventId: number) => {
  redirectToEventDetails(eventId);
};
