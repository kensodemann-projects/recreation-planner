import { CommonData, CommonDataDTO } from './common-data';

export interface ItineraryItem extends CommonData {
  date: string;
  time: string;
  eventRid: number;
}

export interface ItineraryItemDTO extends CommonDataDTO {
  date: string;
  time: string;
  event_rid: number;
}
