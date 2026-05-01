'use server';

import { ItineraryItem } from '@/models';
import { redirectToDetails } from '@/utils/navigation';
import { redirect } from 'next/navigation';
import { deleteItineraryItem } from '../../data';

export const deleteConfirmed = async (eventId: number, i: ItineraryItem) => {
  if (await deleteItineraryItem(i)) {
    redirectToDetails('events', eventId, 'Itinerary');
  } else {
    redirect('/error');
  }
};

export const deleteAborted = async (eventId: number) => {
  redirectToDetails('events', eventId, 'Itinerary');
};
