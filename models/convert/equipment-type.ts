import { EquipmentType, EquipmentTypeDTO } from '../equipment-type';

export const convertToEquipmentType = (dto: EquipmentTypeDTO): EquipmentType => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
});

export const convertToEquipmentTypeDTO = (equipmentType: EquipmentType): EquipmentTypeDTO => ({
  id: equipmentType.id,
  name: equipmentType.name.trim(),
  description: equipmentType.description?.trim(),
});
