import { CommonData, CommonDataDTO } from './common-data';
import { EquipmentEventType, EquipmentEventTypeDTO } from './equipment-event-type';
import { UsageUnits, UsageUnitsDTO } from './usage-units';

export interface EquipmentEventDTO extends CommonDataDTO {
  equipment_rid: number;
  date: string;
  cost: number | null;
  usage: number | null;
  usage_units_rid: number | null;
  usage_units?: UsageUnitsDTO;
  equipment_event_type_rid: number;
  equipment_event_types?: EquipmentEventTypeDTO;
}

export interface EquipmentEvent extends CommonData {
  equipmentRid: number;
  date: string;
  cost: number | null;
  usage: number | null;
  usageUnits?: UsageUnits;
  equipmentEventType: EquipmentEventType;
}
