'use server';

import { Event } from '@/models';
import { redirect } from 'next/navigation';
import { addPlace, fetchPlaceTypes } from '../../places/data';
import { addEvent } from '../data';

const createEntities = async (evt: Event) => {
  if (evt.place.id! < 0) {
    const types = await fetchPlaceTypes();
    const place = await addPlace({
      name: `Edit Me for: ${evt.name}`,
      description: null,
      type: types[0],
      website: null,
      phoneNumber: null,
      address: {
        line1: null,
        line2: null,
        city: null,
        state: null,
        postal: null,
      },
    });
    return addEvent({ ...evt, place: place! });
  } else {
    return addEvent(evt);
  }
};

export const createConfirmed = async (evt: Event) => {
  if (await createEntities(evt)) {
    redirect('/adventure/events');
  } else {
    redirect('/error');
  }
};
