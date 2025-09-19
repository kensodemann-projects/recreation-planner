'use server';

import { ItineraryItem } from '@/models';
import { redirect } from 'next/navigation';
import { updateItineraryItem } from '../../data';
import { redirectToEventDetails } from '../../utils';

export const updateConfirmed = async (item: ItineraryItem) => {
  if (await updateItineraryItem(item)) {
    redirectToEventDetails(item.eventRid!);
  } else {
    redirect('/error');
  }
};
