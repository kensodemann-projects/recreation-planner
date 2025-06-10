import { CommonData, CommonDataDTO } from './common-data';
import { TodoItem, TodoItemDTO } from './todo-item';

export interface TodoCollection extends CommonData {
  dueDate: string | null | undefined;
  isComplete: boolean;
  eventRid?: number | null | undefined;
  todoItems: Array<TodoItem>;
}

export interface TodoCollectionDTO extends CommonDataDTO {
  due_date: string | null | undefined;
  is_complete: boolean;
  event_rid?: number | null | undefined;
  todo_items?: Array<TodoItemDTO>;
}
