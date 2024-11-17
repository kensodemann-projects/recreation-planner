import { Event, EventDTO } from '../event';
import { EventType, EventTypeDTO } from '../event-type';
import { Place } from '../place';
import { PlaceTypeDTO } from '../place-type';
import { convertToPlace } from './place';

export const convertToEvent = (dto: Partial<EventDTO>): Partial<Event> => {
  const place: Partial<Place> | undefined = dto.place_rid
    ? convertToPlace({ ...(dto.places as PlaceTypeDTO), id: dto.place_rid })
    : undefined;

  const type: EventType | undefined = dto.event_type_rid
    ? {
        id: dto.event_type_rid,
        name: (dto.event_types as EventTypeDTO).name,
        description: (dto.event_types as EventTypeDTO).description,
      }
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
  };
};

export const convertToEventDTO = (event: Event): EventDTO => ({
  name: event.name,
  description: event.description || null,
  begin_date: event.beginDate,
  place_rid: event.place.id!,
  event_type_rid: event.type.id!,
  begin_time: event.beginTime || null,
  end_date: event.endDate || null,
  end_time: event.endTime || null,
});
