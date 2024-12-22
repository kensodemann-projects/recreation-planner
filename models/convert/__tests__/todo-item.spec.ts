import { describe, expect, it } from 'vitest';
import { convertToTodoItem, convertToTodoItemDTO } from '../todo-item';

describe('todo item converters', () => {
  describe('to TodoItem', () => {
    it('converts a base object', () => {
      expect(convertToTodoItem({ id: 42, name: 'Do the needful' })).toEqual({ id: 42, name: 'Do the needful' });
    });

    it('converts a full object', () => {
      expect(convertToTodoItem({ id: 42, name: 'Do the needful', is_complete: false, todo_collection_rid: 3 })).toEqual(
        { id: 42, name: 'Do the needful', isComplete: false },
      );
    });
  });

  describe('to TodoItem DTO', () => {
    it('converts the item and adds the collection ref ID', () => {
      expect(convertToTodoItemDTO({ id: 42, name: 'Do the needful', isComplete: false }, { id: 3 })).toEqual({
        id: 42,
        name: 'Do the needful',
        is_complete: false,
        todo_collection_rid: 3,
      });
    });
  });
});
