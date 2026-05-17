'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export const setShowAllUpcomingEvents = async (showAll: boolean) => {
  const cookieStore = await cookies();
  cookieStore.set('show-all-upcoming-events', showAll ? 'true' : 'false', {
    maxAge: ONE_YEAR_IN_SECONDS,
  });
  revalidatePath('/adventure/events');
};

export const setShowAllPriorEvents = async (showAll: boolean) => {
  const cookieStore = await cookies();
  cookieStore.set('show-all-prior-events', showAll ? 'true' : 'false', {
    maxAge: ONE_YEAR_IN_SECONDS,
  });
  revalidatePath('/adventure/events');
};
