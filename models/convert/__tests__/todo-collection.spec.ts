import { describe, expect, it } from 'vitest';
import { convertToTodoCollection, convertToTodoCollectionDTO } from '../todo-collection';

describe('todo collection converters', () => {
  describe('to todo Collection', () => {
    const testCases = [
      {
        name: 'converts a basic collection',
        input: {
          id: 1,
          name: 'Stuff I need to do',
        },
        expected: {
          id: 1,
          name: 'Stuff I need to do',
        },
      },
      {
        name: 'converts a full base collection without todos',
        input: {
          id: 1,
          name: 'Stuff I need to do',
          description: 'This is a thing, and I need to do things that are stuff',
          due_date: '2025-05-23',
          is_complete: false,
        },
        expected: {
          id: 1,
          name: 'Stuff I need to do',
          description: 'This is a thing, and I need to do things that are stuff',
          dueDate: '2025-05-23',
          isComplete: false,
        },
      },
      {
        name: 'converts an event related collection',
        input: {
          id: 1,
          name: 'Stuff I need to do',
          description: 'This is a thing, and I need to do things that are stuff',
          due_date: '2025-05-23',
          event_rid: 4273,
          is_complete: false,
        },
        expected: {
          id: 1,
          name: 'Stuff I need to do',
          description: 'This is a thing, and I need to do things that are stuff',
          dueDate: '2025-05-23',
          isComplete: false,
          eventRid: 4273,
        },
      },
      {
        name: 'converts an equipment related collection',
        input: {
          id: 1,
          name: 'Stuff I need to do',
          description: 'This is a thing, and I need to do things that are stuff',
          due_date: '2025-05-23',
          equipment_rid: 4273,
          is_complete: false,
        },
        expected: {
          id: 1,
          name: 'Stuff I need to do',
          description: 'This is a thing, and I need to do things that are stuff',
          dueDate: '2025-05-23',
          isComplete: false,
          equipmentRid: 4273,
        },
      },
      {
        name: 'converts a full base collection with child items',
        input: {
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
        },
        expected: {
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
              todoCollectionRid: 1,
            },
            {
              id: 73,
              name: 'Bite the unbitten',
              isComplete: true,
              todoCollectionRid: 1,
            },
            {
              id: 314159,
              name: 'Eat the pi',
              isComplete: false,
              todoCollectionRid: 1,
            },
          ],
        },
      },
    ];

    it.each(testCases)('$name', ({ input, expected }) => expect(convertToTodoCollection(input)).toEqual(expected));
  });

  describe('to DTO', () => {
    const testCases = [
      {
        name: 'converts the full collection without the children',
        input: {
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
              todoCollectionRid: 1,
            },
            {
              id: 73,
              name: 'Bite the unbitten',
              isComplete: true,
              todoCollectionRid: 1,
            },
            {
              id: 314159,
              name: 'Eat the pi',
              isComplete: false,
              todoCollectionRid: 1,
            },
          ],
        },
        expected: {
          id: 1,
          name: 'Stuff I need to do',
          description: 'This is a thing, and I need to do things that are stuff',
          due_date: '2025-05-23',
          event_rid: null,
          equipment_rid: null,
          is_complete: false,
        },
      },
      {
        name: 'converts an event related collection',
        input: {
          id: 1,
          name: 'Stuff I need to do',
          description: 'This is a thing, and I need to do things that are stuff',
          dueDate: '2025-05-23',
          isComplete: false,
          eventRid: 4273,
          todoItems: [
            {
              id: 42,
              name: 'Do the needful',
              isComplete: false,
              todoCollectionRid: 1,
            },
            {
              id: 73,
              name: 'Bite the unbitten',
              isComplete: true,
              todoCollectionRid: 1,
            },
            {
              id: 314159,
              name: 'Eat the pi',
              isComplete: false,
              todoCollectionRid: 1,
            },
          ],
        },
        expected: {
          id: 1,
          name: 'Stuff I need to do',
          description: 'This is a thing, and I need to do things that are stuff',
          due_date: '2025-05-23',
          event_rid: 4273,
          equipment_rid: null,
          is_complete: false,
        },
      },
      {
        name: 'converts an equipment related collection',
        input: {
          id: 1,
          name: 'Stuff I need to do',
          description: 'This is a thing, and I need to do things that are stuff',
          dueDate: '2025-05-23',
          isComplete: false,
          equipmentRid: 4273,
          todoItems: [
            {
              id: 42,
              name: 'Do the needful',
              isComplete: false,
              todoCollectionRid: 1,
            },
            {
              id: 73,
              name: 'Bite the unbitten',
              isComplete: true,
              todoCollectionRid: 1,
            },
            {
              id: 314159,
              name: 'Eat the pi',
              isComplete: false,
              todoCollectionRid: 1,
            },
          ],
        },
        expected: {
          id: 1,
          name: 'Stuff I need to do',
          description: 'This is a thing, and I need to do things that are stuff',
          due_date: '2025-05-23',
          event_rid: null,
          equipment_rid: 4273,
          is_complete: false,
        },
      },
    ];

    it.each(testCases)('$name', ({ input, expected }) => expect(convertToTodoCollectionDTO(input)).toEqual(expected));
  });
});
