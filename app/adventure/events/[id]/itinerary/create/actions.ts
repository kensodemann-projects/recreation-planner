'use server';

import { ItineraryItem } from '@/models';
import { redirect } from 'next/navigation';
import { addItineraryItem } from '../data';
import { redirectToEventDetails } from '../utils';

export const createConfirmed = async (item: ItineraryItem) => {
  if (await addItineraryItem(item)) {
    redirectToEventDetails(item.eventRid!);
  } else {
    redirect('/error');
  }
};
