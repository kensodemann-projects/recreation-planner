'use server';

import { Place } from '@/models';
import { redirect } from 'next/navigation';
import { deletePlace } from '../../data';

export const deleteConfirmed = async (p: Place) => {
  await deletePlace(p);
  redirect('/adventure/places');
};

export const deleteAborted = async () => {
  redirect('/adventure/places');
};
