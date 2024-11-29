'use server';

import { Place } from '@/models';
import { redirect } from 'next/navigation';
import { deletePlace } from '../../data';

export const deletePlaceConfirmed = async (p: Place) => {
  await deletePlace(p);
  redirect('/adventure/places');
};

export const deletePlaceAborted = async () => {
  redirect('/adventure/places');
};
