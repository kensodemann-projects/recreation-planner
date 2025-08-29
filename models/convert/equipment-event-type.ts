import { EquipmentEventType, EquipmentEventTypeDTO } from '../equipment-event-type';

export const convertToEquipmentEventType = (dto: EquipmentEventTypeDTO): EquipmentEventType => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
});
