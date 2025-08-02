'use server';

import { Place } from '@/models';
import { addPlace } from '../data';
import { redirect } from 'next/navigation';

export const createConfirmed = async (p: Place) => {
  if (await addPlace(p)) {
    redirect('/adventure/places');
  } else {
    redirect('/error');
  }
};
