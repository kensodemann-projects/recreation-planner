'use server';

import { Place } from '@/models';
import { updatePlace } from '../../data';
import { redirect } from 'next/navigation';

export const updatePlaceConfirmed = async (p: Place) => {
  if (await updatePlace(p)) {
    redirect(`/adventure/places/${p.id}`);
  } else {
    redirect('/error');
  }
};
