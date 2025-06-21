import { Equipment, EquipmentDTO } from '../equipment';
import { TodoItem, TodoItemDTO } from '../todo-item';

export const convertToEquipment = (dto: Partial<EquipmentDTO>): Partial<Equipment> => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  purchaseDate: dto.purchase_date,
  cost: dto.cost,
});

export const convertToEquipmentDTO = (equipment: Equipment): EquipmentDTO => ({
  name: equipment.name,
  description: equipment.description || null,
  purchase_date: equipment.purchaseDate || null,
  cost: equipment.cost ?? null,
});
