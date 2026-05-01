'use server';

import { ItineraryItem } from '@/models';
import { redirectToDetails } from '@/utils/navigation';
import { redirect } from 'next/navigation';
import { addItineraryItem } from '../data';

export const createConfirmed = async (item: ItineraryItem) => {
  if (await addItineraryItem(item)) {
    redirectToDetails('events', item.eventRid!, 'Itinerary');
  } else {
    redirect('/error');
  }
};
