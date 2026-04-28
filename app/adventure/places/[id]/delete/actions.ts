'use server';

import { Place } from '@/models';
import { redirect } from 'next/navigation';
import { deletePlace } from '../../data';

export const deleteConfirmed = async (p: Place) => {
  if (await deletePlace(p)) {
    redirect('/adventure/places');
  } else {
    redirect('/error');
  }
};

export const deleteAborted = async () => {
  redirect('/adventure/places');
};
