import { CommonData, CommonDataDTO } from './common-data';

export interface EquipmentDTO extends CommonDataDTO {
  purchase_date: string | null;
  cost: number | null;
}

export interface Equipment extends CommonData {
  purchaseDate: string | null;
  cost: number | null;
}
