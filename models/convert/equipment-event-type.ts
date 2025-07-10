import { EquipmentEventType, EquipmentEventTypeDTO } from '../equipment-event-type';

export const convertToEquipmentEventType = (dto: EquipmentEventTypeDTO): EquipmentEventType => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
});

export const convertToEquipmentEventTypeDTO = (equipmentType: EquipmentEventType): EquipmentEventTypeDTO => ({
  id: equipmentType.id,
  name: equipmentType.name,
  description: equipmentType.description,
});
