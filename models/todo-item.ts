import { CommonData, CommonDataDTO } from './common-data';

export interface TodoItem extends Omit<CommonData, 'description'> {
  isComplete: boolean;
  todoCollectionRid: number;
}

export interface TodoItemDTO extends Omit<CommonDataDTO, 'description'> {
  is_complete: boolean;
  todo_collection_rid: number;
}
