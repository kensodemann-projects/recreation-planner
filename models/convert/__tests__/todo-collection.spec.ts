import { describe, expect, it } from 'vitest';
import { convertToTodoCollection, convertToTodoCollectionDTO } from '../todo-collection';

describe('todo collection converters', () => {
  describe('to todo Collection', () => {
    it('converts a basic collection', () => {
      expect(
        convertToTodoCollection({
          id: 1,
          name: 'Stuff I need to do',
        }),
      ).toEqual({
        id: 1,
        name: 'Stuff I need to do',
      });
    });

    it('converts a full base collection without todos', () => {
      expect(
        convertToTodoCollection({
          id: 1,
          name: 'Stuff I need to do',
          description: 'This is a thing, and I need to do things that are stuff',
          due_date: '2025-05-23',
          is_complete: false,
        }),
      ).toEqual({
        id: 1,
        name: 'Stuff I need to do',
        description: 'This is a thing, and I need to do things that are stuff',
        dueDate: '2025-05-23',
        isComplete: false,
      });
    });

    it('converts a full base collection with child items', () => {
      expect(
        convertToTodoCollection({
          id: 1,
          name: 'Stuff I need to do',
          description: 'This is a thing, and I need to do things that are stuff',
          due_date: '2025-05-23',
          is_complete: false,
          todo_items: [
            {
              id: 42,
              name: 'Do the needful',
              is_complete: false,
              todo_collection_rid: 1,
            },
            {
              id: 73,
              name: 'Bite the unbitten',
              is_complete: true,
              todo_collection_rid: 1,
            },
            {
              id: 314159,
              name: 'Eat the pi',
              is_complete: false,
              todo_collection_rid: 1,
            },
          ],
        }),
      ).toEqual({
        id: 1,
        name: 'Stuff I need to do',
        description: 'This is a thing, and I need to do things that are stuff',
        dueDate: '2025-05-23',
        isComplete: false,
        todoItems: [
          {
            id: 42,
            name: 'Do the needful',
            isComplete: false,
          },
          {
            id: 73,
            name: 'Bite the unbitten',
            isComplete: true,
          },
          {
            id: 314159,
            name: 'Eat the pi',
            isComplete: false,
          },
        ],
      });
    });
  });

  describe('to DTO', () => {
    it('converts the full collection without the children', () => {
      expect(
        convertToTodoCollectionDTO({
          id: 1,
          name: 'Stuff I need to do',
          description: 'This is a thing, and I need to do things that are stuff',
          dueDate: '2025-05-23',
          isComplete: false,
          todoItems: [
            {
              id: 42,
              name: 'Do the needful',
              isComplete: false,
            },
            {
              id: 73,
              name: 'Bite the unbitten',
              isComplete: true,
            },
            {
              id: 314159,
              name: 'Eat the pi',
              isComplete: false,
            },
          ],
        }),
      ).toEqual({
        id: 1,
        name: 'Stuff I need to do',
        description: 'This is a thing, and I need to do things that are stuff',
        due_date: '2025-05-23',
        is_complete: false,
      });
    });
  });
});
