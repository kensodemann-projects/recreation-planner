import { CommonData, CommonDataDTO } from './common-data';
import { Equipment, EquipmentDTO } from './equipment';
import { Event, EventDTO } from './event';
import { TodoItem, TodoItemDTO } from './todo-item';

// These are utilized differently depending on context:
//   - TODOs & Dashboard: these are parents and the equipment/events are children
//   - Equipment & Events: these are the child elements
//
// This is why the associated RIDs are in both types along with the objects

export interface TodoCollectionDTO extends CommonDataDTO {
  due_date: string | null;
  is_complete: boolean;
  event_rid: number | null;
  equipment_rid: number | null;
  todo_items?: Array<TodoItemDTO>;
  events?: EventDTO;
  equipment?: EquipmentDTO;
}

export interface TodoCollection extends CommonData {
  dueDate: string | null;
  isComplete: boolean;
  eventRid: number | null;
  event?: Event;
  equipmentRid: number | null;
  equipment?: Equipment;
  todoItems: Array<TodoItem>;
}
