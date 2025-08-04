import { CommonData, CommonDataDTO } from './common-data';

export interface Note extends CommonData {
  date: string;
  description: string | null;
  equipmentRid?: number | null;
  eventRid?: number | null;
  placeRid?: number | null;
}

export interface NoteDTO extends CommonDataDTO {
  date: string;
  description: string | null;
  equipment_rid: number | null;
  event_rid: number | null;
  place_rid: number | null;
}
