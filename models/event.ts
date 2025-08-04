import { EventType, EventTypeDTO } from './event-type';
import { CommonData, CommonDataDTO } from './common-data';
import { Place, PlaceDTO } from './place';

export interface EventDTO extends CommonDataDTO {
  begin_date: string;
  begin_time: string | null;
  end_date: string | null;
  end_time: string | null;
  place_rid: number;
  event_type_rid: number;
  places?: Partial<PlaceDTO>;
  event_types?: EventTypeDTO;
}

export interface Event extends CommonData {
  beginDate: string;
  beginTime?: string | null;
  endDate?: string | null;
  endTime?: string | null;
  place: Partial<Place>;
  type: EventType;
}
