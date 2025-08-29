import { TodoCollection, TodoCollectionDTO } from '../todo-collection';
import { TodoItem } from '../todo-item';
import { convertToEquipment } from './equipment';
import { convertToEvent } from './event';
import { convertToTodoItem } from './todo-item';

export const convertToTodoCollection = (dto: TodoCollectionDTO): TodoCollection => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  dueDate: dto.due_date,
  isComplete: dto.is_complete,
  eventRid: dto.event_rid,
  event: dto.events ? convertToEvent(dto.events) : undefined,
  equipmentRid: dto.equipment_rid,
  equipment: dto.equipment ? convertToEquipment(dto.equipment) : undefined,
  todoItems: dto.todo_items ? dto.todo_items.map((x) => convertToTodoItem(x) as TodoItem) : [],
});

export const convertToTodoCollectionDTO = (collection: TodoCollection): TodoCollectionDTO => ({
  id: collection.id,
  name: collection.name.trim(),
  description: collection.description?.trim() || null,
  due_date: collection.dueDate?.trim() || null,
  event_rid: collection.eventRid || null,
  equipment_rid: collection.equipmentRid || null,
  is_complete: collection.isComplete,
});
