'use server';

import { ItineraryItem } from '@/models';
import { deleteItineraryItem } from '../../data';
import { redirectToEventDetails } from '../../utils';

export const deleteConfirmed = async (eventId: number, i: ItineraryItem) => {
  await deleteItineraryItem(i);
  redirectToEventDetails(eventId);
};

export const deleteAborted = async (eventId: number) => {
  redirectToEventDetails(eventId);
};
