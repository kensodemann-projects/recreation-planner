import { TodoItem, TodoItemDTO } from '../todo-item';

export const convertToTodoItem = (dto: Partial<TodoItemDTO>): Partial<TodoItem> => ({
  id: dto.id,
  name: dto.name,
  isComplete: dto.is_complete,
  todoCollectionRid: dto.todo_collection_rid,
});

export const convertToTodoItemDTO = (todoItem: TodoItem): TodoItemDTO => ({
  id: todoItem.id,
  name: todoItem.name.trim(),
  is_complete: todoItem.isComplete,
  todo_collection_rid: todoItem.todoCollectionRid,
});
