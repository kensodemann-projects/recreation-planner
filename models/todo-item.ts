export interface TodoItem {
  id?: number | undefined;
  name: string;
  isComplete: boolean;
  todoCollectionRid: number;
}

export interface TodoItemDTO {
  id?: number | undefined;
  name: string;
  is_complete: boolean;
  todo_collection_rid: number;
}
