import { TodoCollection, TodoCollectionDTO } from '../todo-collection';
import { TodoItem } from '../todo-item';
import { convertToTodoItem } from './todo-item';

export const convertToTodoCollection = (dto: Partial<TodoCollectionDTO>): Partial<TodoCollection> => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  dueDate: dto.due_date,
  isComplete: dto.is_complete,
  todoItems: dto.todo_items ? dto.todo_items.map((x) => convertToTodoItem(x) as TodoItem) : undefined,
});

export const convertToTodoCollectionDTO = (collection: TodoCollection): TodoCollectionDTO => ({
  id: collection.id,
  name: collection.name,
  description: collection.description,
  due_date: collection.dueDate,
  is_complete: collection.isComplete,
});
