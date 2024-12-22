import { TodoCollection, TodoItem } from '@/models';
import { vi } from 'vitest';

const TODO_ITEMS: TodoItem[] = [
  {
    id: 21,
    name: 'Test the fetching',
    isComplete: true,
  },
  {
    id: 37,
    name: 'Test the creation of a collection',
    isComplete: false,
  },
  {
    id: 12,
    name: 'Test the creation of an item ',
    isComplete: false,
  },
  {
    id: 42,
    name: 'Test the update of an item ',
    isComplete: false,
  },
  {
    id: 42,
    name: 'Test the completion of an item ',
    isComplete: false,
  },
];

const TODO_COLLECTIONS: TodoCollection[] = [
  {
    id: 1,
    name: 'Todo Development',
    description: 'Make it so',
    isComplete: true,
    dueDate: '2025-05-31',
    todoItems: [],
  },
  {
    id: 2,
    name: 'Todo Testing',
    description: 'Running through the various tests associated with todods',
    isComplete: false,
    dueDate: '2025-07-09',
    todoItems: TODO_ITEMS,
  },
  {
    id: 3,
    name: 'Todo Release',
    description: 'Release the feature to the general public',
    isComplete: false,
    dueDate: null,
    todoItems: [],
  },
];

export const fetchOpenTodoCollections = vi.fn().mockResolvedValue(TODO_COLLECTIONS.filter((x) => !x.isComplete));
