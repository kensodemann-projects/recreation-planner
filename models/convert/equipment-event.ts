import { EquipmentEvent, EquipmentEventDTO } from '../equipment-event';
import { convertToEquipmentEventType } from './equipment-event-type';
import { convertToUsageUnits } from './usage-units';

export const convertToEquipmentEvent = (dto: EquipmentEventDTO): EquipmentEvent => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  equipmentRid: dto.equipment_rid,
  date: dto.date,
  cost: dto.cost,
  usage: dto.usage,
  equipmentEventType: convertToEquipmentEventType(dto.equipment_event_types!),
  usageUnits: dto.usage_units && convertToUsageUnits(dto.usage_units),
});

export const convertToEquipmentEventDTO = (event: EquipmentEvent): EquipmentEventDTO => ({
  name: event.name,
  description: event.description || null,
  equipment_rid: event.equipmentRid,
  date: event.date,
  cost: event.cost,
  usage: event.usage,
  usage_units_rid: event.usageUnits ? event.usageUnits.id! : null,
  equipment_event_type_rid: event.equipmentEventType.id!,
});
