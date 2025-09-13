import { Note, TodoCollection, TodoItem } from '@/models';

export const testTodoItems: TodoItem[] = [
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

export const testTodoCollections: TodoCollection[] = [
  {
    id: 1,
    name: 'Todo Development',
    description: 'Make it so',
    isComplete: true,
    dueDate: '2025-05-31',
    todoItems: testTodoItems.filter((x) => x.todoCollectionRid === 1),
    eventRid: 314,
    equipmentRid: null,
  },
  {
    id: 2,
    name: 'Todo Testing',
    description: 'Running through the various tests associated with todods',
    isComplete: false,
    dueDate: '2025-07-09',
    todoItems: testTodoItems.filter((x) => x.todoCollectionRid === 2),
    eventRid: 314,
    equipmentRid: null,
  },
  {
    id: 3,
    name: 'Todo Release',
    description: 'Release the feature to the general public',
    isComplete: false,
    dueDate: null,
    todoItems: testTodoItems.filter((x) => x.todoCollectionRid === 3),
    eventRid: 314,
    equipmentRid: null,
  },
];

export const testNotes: Note[] = [];

export const testEvent = {
  id: 314,
  beginDate: '2024-09-28',
  beginTime: '18:30',
  endDate: '2024-09-30',
  endTime: '22:30',
  name: "Women's Hockey Tournament",
  description: 'A three day long tournament of women playing hockey',
  place: {
    id: 32,
    name: 'Richard Bong State Park',
    description: null,
    address: {
      line1: '26313 Burlington Rd.',
      line2: null,
      city: 'Kansasville',
      state: 'WI',
      postal: '53139',
    },
    phoneNumber: '(262) 878-5600',
    website: 'https://dnr.wisconsin.gov/topic/parks/richardbong',
    type: {
      id: 1,
      name: 'State Park',
      description: 'A state owned property for camping and recreation.',
    },
  },
  type: {
    id: 2,
    name: 'Sporting Event',
    description: 'The primary purpose of the activity is to view a competition.',
  },
  notes: testNotes,
  todoCollections: testTodoCollections,
};
