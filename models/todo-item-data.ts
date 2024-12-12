export interface TodoItem {
  id?: number | undefined;
  name: string;
  isComplete: boolean;
}

export interface TodoItemDTO {
  id?: number | undefined;
  name: string;
  complete: boolean;
}
