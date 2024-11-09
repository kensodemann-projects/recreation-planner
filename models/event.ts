import { EventType } from './event-type';
import { CommonData } from './common-data';
import { Place } from './place';

export interface Event extends CommonData {
  beginDate: string;
  beginTime?: string | undefined | null;
  endDate?: string | undefined | null;
  endTime?: string | undefined | null;
  place: Partial<Place>;
  type: EventType;
}
