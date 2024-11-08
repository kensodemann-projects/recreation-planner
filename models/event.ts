import { EventType } from './event-type';
import { CommonData } from './common-data';
import { Place } from './place';

export interface Event extends CommonData {
  beginDate: string;
  beginTime?: string | undefined;
  endDate?: string | undefined;
  endTime?: string | undefined;
  place: Place;
  type: EventType;
}
