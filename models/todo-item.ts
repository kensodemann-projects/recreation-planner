export interface TodoItem {
  id?: number;
  name: string;
  isComplete: boolean;
  todoCollectionRid: number;
}

export interface TodoItemDTO {
  id?: number;
  name: string;
  is_complete: boolean;
  todo_collection_rid: number;
}
