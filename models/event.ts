import { CommonData, CommonDataDTO } from './common-data';
import { EventType, EventTypeDTO } from './event-type';
import { ItineraryItem, ItineraryItemDTO } from './itinerary-item';
import { Note, NoteDTO } from './note';
import { Place, PlaceDTO } from './place';
import { TodoCollection, TodoCollectionDTO } from './todo-collection';

export interface EventDTO extends CommonDataDTO {
  begin_date: string;
  begin_time: string | null;
  end_date: string | null;
  end_time: string | null;
  place_rid: number;
  event_type_rid: number;
  places?: PlaceDTO;
  event_types?: EventTypeDTO;
  notes?: NoteDTO[];
  todo_collections?: TodoCollectionDTO[];
  itinerary_items?: ItineraryItemDTO[];
}

export interface Event extends CommonData {
  beginDate: string;
  beginTime?: string | null;
  endDate?: string | null;
  endTime?: string | null;
  place: Place;
  type: EventType;
  notes?: Note[];
  todoCollections?: TodoCollection[];
  itinerary?: ItineraryItem[];
}
