import { Event, EventDTO } from '../event';
import { EventType } from '../event-type';
import { ItineraryItem } from '../itinerary-item';
import { Note } from '../note';
import { Place, PlaceDTO } from '../place';
import { TodoCollection } from '../todo-collection';
import { convertToEventType } from './event-type';
import { convertToItineraryItem } from './itinerary-item';
import { convertToNote } from './note';
import { convertToPlace } from './place';
import { convertToTodoCollection } from './todo-collection';

export const convertToEvent = (dto: EventDTO): Event => {
  const place: Place = convertToPlace({ ...(dto.places as PlaceDTO), id: dto.place_rid });
  const type: EventType = convertToEventType(dto.event_types!);
  const itinerary: ItineraryItem[] | undefined = dto.itinerary_items
    ? dto.itinerary_items.map((i) => convertToItineraryItem(i))
    : undefined;
  const notes: Note[] | undefined = dto.notes ? dto.notes.map((n) => convertToNote(n)) : undefined;
  const todoCollections: TodoCollection[] | undefined = dto.todo_collections
    ? dto.todo_collections.map((c) => convertToTodoCollection(c))
    : undefined;

  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    beginDate: dto.begin_date,
    beginTime: dto.begin_time,
    endDate: dto.end_date,
    endTime: dto.end_time,
    place,
    type,
    itinerary,
    notes,
    todoCollections,
  };
};

export const convertToEventDTO = (event: Event): EventDTO => ({
  name: event.name.trim(),
  description: event.description?.trim() || null,
  begin_date: event.beginDate.trim(),
  place_rid: event.place.id!,
  event_type_rid: event.type.id!,
  begin_time: event.beginTime?.trim() || null,
  end_date: event.endDate?.trim() || null,
  end_time: event.endTime?.trim() || null,
});
