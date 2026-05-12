import { Event } from '@/models';

export interface EventCardProps {
  baseHref: string;
  event: Event;
  callingPage?: string;
}
