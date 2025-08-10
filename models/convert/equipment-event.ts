import { EquipmentEvent, EquipmentEventDTO } from '../equipment-event';
import { convertToEquipmentEventType } from './equipment-event-type';
import { convertToUsageUnits } from './usage-units';

export const convertToEquipmentEvent = (dto: EquipmentEventDTO): EquipmentEvent => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  date: dto.date,
  cost: dto.cost,
  usage: dto.usage,
  equipmentEventType: convertToEquipmentEventType(dto.equipment_event_types!),
  usageUnits: dto.usage_units && convertToUsageUnits(dto.usage_units),
  equipmentRid: dto.equipment_rid,
});

export const convertToEquipmentEventDTO = (event: EquipmentEvent): EquipmentEventDTO => ({
  name: event.name.trim(),
  description: event.description?.trim() || null,
  date: event.date.trim(),
  cost: event.cost || null,
  usage: event.usage || null,
  usage_units_rid: event.usageUnits ? event.usageUnits.id! : null,
  equipment_event_type_rid: event.equipmentEventType.id!,
  equipment_rid: event.equipmentRid,
});
