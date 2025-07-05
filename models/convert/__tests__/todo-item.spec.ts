import { describe, expect, it } from 'vitest';
import { convertToTodoItem, convertToTodoItemDTO } from '../todo-item';

describe('todo item converters', () => {
  describe('to TodoItem', () => {
    const testCases = [
      {
        name: 'converts a base object',
        value: { id: 42, name: 'Do the needful' },
        expected: { id: 42, name: 'Do the needful' },
      },
      {
        name: 'converts a full object',
        value: { id: 42, name: 'Do the needful', is_complete: false, todo_collection_rid: 3 },
        expected: { id: 42, name: 'Do the needful', isComplete: false, todoCollectionRid: 3 },
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) => expect(convertToTodoItem(value)).toEqual(expected));
  });

  describe('to TodoItem DTO', () => {
    const testCases = [
      {
        name: 'converts the item and adds the collection ref ID',
        value: { id: 42, name: 'Do the needful', isComplete: false, todoCollectionRid: 3 },
        expected: { id: 42, name: 'Do the needful', is_complete: false, todo_collection_rid: 3 },
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) => expect(convertToTodoItemDTO(value)).toEqual(expected));
  });
});
