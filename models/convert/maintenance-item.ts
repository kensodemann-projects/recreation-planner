import { MaintenanceItem, MaintenanceItemDTO } from '../maintenance-item';
import { convertToMaintenanceType } from './maintenance-type';
import { convertToUsageUnits } from './usage-units';

export const convertToMaintenance = (dto: MaintenanceItemDTO): MaintenanceItem => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  date: dto.date,
  cost: dto.cost,
  usage: dto.usage,
  maintenanceType: convertToMaintenanceType(dto.maintenance_types!),
  usageUnits: dto.usage_units && convertToUsageUnits(dto.usage_units),
  equipmentRid: dto.equipment_rid,
});

export const convertToMaintenanceDTO = (event: MaintenanceItem): MaintenanceItemDTO => ({
  name: event.name.trim(),
  description: event.description?.trim() || null,
  date: event.date.trim(),
  cost: event.cost ?? null,
  usage: event.usage ?? null,
  usage_units_rid: event.usageUnits ? event.usageUnits.id! : null,
  maintenance_type_rid: event.maintenanceType.id!,
  equipment_rid: event.equipmentRid,
});
