import { redirect } from 'next/navigation';

export const redirectToEventDetails = (eventRid: number) =>
  redirect(`/adventure/events/${eventRid}?lastActivity=Notes`);
