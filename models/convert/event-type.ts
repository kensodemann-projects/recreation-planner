import { EventType, EventTypeDTO } from '../event-type';

export const convertToEventType = (dto: EventTypeDTO): EventType => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
});
