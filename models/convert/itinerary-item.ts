import { ItineraryItem, ItineraryItemDTO } from '../itinerary-item';

export const convertToItineraryItem = (dto: ItineraryItemDTO): ItineraryItem => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  date: dto.date,
  time: dto.time,
  eventRid: dto.event_rid,
});

export const convertToItineraryItemDTO = (item: ItineraryItem): ItineraryItemDTO => ({
  name: item.name.trim(),
  description: item.description?.trim() || null,
  event_rid: item.eventRid,
  date: item.date.trim(),
  time: item.time.trim(),
});
