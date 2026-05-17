'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const setShowAllUpcomingEvents = async (showAll: boolean) => {
  const cookieStore = await cookies();
  cookieStore.set('show-all-upcoming-events', showAll ? 'true' : 'false');
  revalidatePath('/adventure/events');
};

export const setShowAllPriorEvents = async (showAll: boolean) => {
  const cookieStore = await cookies();
  cookieStore.set('show-all-prior-events', showAll ? 'true' : 'false');
  revalidatePath('/adventure/events');
};
