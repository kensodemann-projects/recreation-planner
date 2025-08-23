import { Event } from '@/models';

export interface EventsListProps {
  callingPage: string;
  className: string;
  events: Event[];
}
