'use server';

import { ItineraryItem } from '@/models';
import { redirect } from 'next/navigation';
import { updateItineraryItem } from '../../data';
import { redirectToDetails } from '@/utils/navigation';

export const updateConfirmed = async (item: ItineraryItem) => {
  if (await updateItineraryItem(item)) {
    redirectToDetails('events', item.eventRid!, 'Itinerary');
  } else {
    redirect('/error');
  }
};
