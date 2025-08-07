import { EventType, EventTypeDTO } from '../event-type';

export const convertToEventType = (dto: EventTypeDTO): EventType => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
});

export const convertToEventTypeDTO = (eventType: EventType): EventTypeDTO => ({
  id: eventType.id,
  name: eventType.name.trim(),
  description: eventType.description?.trim(),
});
