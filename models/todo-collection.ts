import { CommonData, CommonDataDTO } from './common-data';
import { TodoItem, TodoItemDTO } from './todo-item';

export interface TodoCollection extends CommonData {
  dueDate: string | null;
  isComplete: boolean;
  eventRid: number | null;
  equipmentRid: number | null;
  todoItems: Array<TodoItem>;
}

export interface TodoCollectionDTO extends CommonDataDTO {
  due_date: string | null;
  is_complete: boolean;
  event_rid: number | null;
  equipment_rid: number | null;
  todo_items?: Array<TodoItemDTO>;
}
