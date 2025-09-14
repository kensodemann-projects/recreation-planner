import { CommonData, CommonDataDTO } from './common-data';
import { MaintenanceType, MaintenanceTypeDTO } from './maintenance-type';
import { UsageUnits, UsageUnitsDTO } from './usage-units';

export interface MaintenanceItemDTO extends CommonDataDTO {
  date: string;
  cost: number | null;
  usage: number | null;
  usage_units_rid: number | null;
  usage_units?: UsageUnitsDTO;
  maintenance_type_rid: number;
  maintenance_types?: MaintenanceTypeDTO;
  equipment_rid: number;
}

export interface MaintenanceItem extends CommonData {
  date: string;
  cost: number | null;
  usage: number | null;
  usageUnits?: UsageUnits;
  maintenanceType: MaintenanceType;
  equipmentRid: number;
}
