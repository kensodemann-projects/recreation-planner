import { TodoCollection, TodoItem } from '@/models';
import { vi } from 'vitest';

const TODO_ITEMS: TodoItem[] = [
  {
    id: 17,
    name: 'Fetch the data',
    isComplete: true,
    todoCollectionRid: 1,
  },
  {
    id: 21,
    name: 'Test the fetching',
    isComplete: true,
    todoCollectionRid: 2,
  },
  {
    id: 19,
    name: 'Create the collection',
    isComplete: true,
    todoCollectionRid: 1,
  },
  {
    id: 82,
    name: 'Create an item',
    isComplete: true,
    todoCollectionRid: 1,
  },
  {
    id: 37,
    name: 'Test the creation of a collection',
    isComplete: false,
    todoCollectionRid: 2,
  },
  {
    id: 12,
    name: 'Test the creation of an item ',
    isComplete: false,
    todoCollectionRid: 2,
  },
  {
    id: 42,
    name: 'Test the update of an item ',
    isComplete: false,
    todoCollectionRid: 2,
  },
  {
    id: 73,
    name: 'Test the completion of an item ',
    isComplete: false,
    todoCollectionRid: 2,
  },
];

const TODO_COLLECTIONS: TodoCollection[] = [
  {
    id: 1,
    name: 'Todo Development',
    description: 'Make it so',
    isComplete: true,
    dueDate: '2025-05-31',
    todoItems: TODO_ITEMS.filter((x) => x.todoCollectionRid === 1),
  },
  {
    id: 2,
    name: 'Todo Testing',
    description: 'Running through the various tests associated with todods',
    isComplete: false,
    dueDate: '2025-07-09',
    todoItems: TODO_ITEMS.filter((x) => x.todoCollectionRid === 2),
  },
  {
    id: 3,
    name: 'Todo Release',
    description: 'Release the feature to the general public',
    isComplete: false,
    dueDate: null,
    todoItems: TODO_ITEMS.filter((x) => x.todoCollectionRid === 3),
  },
];

export const fetchOpenTodoCollections = vi.fn().mockResolvedValue(TODO_COLLECTIONS.filter((x) => !x.isComplete));
export const fetchTodoCollection = vi.fn().mockResolvedValue(TODO_COLLECTIONS[2]);
export const fetchEventName = vi.fn().mockResolvedValue(null);
export const addTodoCollection = vi.fn().mockResolvedValue(null);
export const updateTodoCollection = vi.fn().mockResolvedValue(null);
export const addTodoItem = vi.fn().mockResolvedValue(null);
export const updateTodoItem = vi.fn().mockResolvedValue(null);
