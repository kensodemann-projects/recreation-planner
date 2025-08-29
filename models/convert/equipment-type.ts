import { EquipmentType, EquipmentTypeDTO } from '../equipment-type';

export const convertToEquipmentType = (dto: EquipmentTypeDTO): EquipmentType => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
});
