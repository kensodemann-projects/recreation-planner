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
  places?: Array<Partial<PlaceDTO>> | Partial<PlaceDTO> | undefined;
  event_types?: Array<EventTypeDTO> | EventTypeDTO | undefined;
}

export interface Event extends CommonData {
  beginDate: string;
  beginTime?: string | undefined | null;
  endDate?: string | undefined | null;
  endTime?: string | undefined | null;
  place: Partial<Place>;
  type: EventType;
}
