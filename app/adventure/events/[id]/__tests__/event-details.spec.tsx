import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import EventDetails from '../event-details';
import { TodoCollection, TodoItem } from '@/models';

const testEvent = {
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
    address: {
      line1: '26313 Burlington Rd.',
      city: 'Kansasville',
      state: 'WI',
      postal: '53139',
    },
    phoneNumber: '(262) 878-5600',
    website: 'https://dnr.wisconsin.gov/topic/parks/richardbong',
  },
  type: {
    id: 2,
    name: 'Sporting Event',
    description: 'The primary purpose of the activity is to view a competition.',
  },
};

const testTodoItems: TodoItem[] = [
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

const testTodoCollections: TodoCollection[] = [
  {
    id: 1,
    name: 'Todo Development',
    description: 'Make it so',
    isComplete: true,
    dueDate: '2025-05-31',
    todoItems: testTodoItems.filter((x) => x.todoCollectionRid === 1),
    eventRid: testEvent.id,
  },
  {
    id: 2,
    name: 'Todo Testing',
    description: 'Running through the various tests associated with todods',
    isComplete: false,
    dueDate: '2025-07-09',
    todoItems: testTodoItems.filter((x) => x.todoCollectionRid === 2),
    eventRid: testEvent.id,
  },
  {
    id: 3,
    name: 'Todo Release',
    description: 'Release the feature to the general public',
    isComplete: false,
    dueDate: null,
    todoItems: testTodoItems.filter((x) => x.todoCollectionRid === 3),
    eventRid: testEvent.id,
  },
];

describe('Event Details', () => {
  afterEach(() => cleanup());

  it('renders the name', () => {
    render(<EventDetails event={testEvent} todoCollections={testTodoCollections} />);
    expect(screen.getByRole('heading', { level: 2, name: testEvent.name })).toBeDefined();
  });

  it('renders the event type', () => {
    render(<EventDetails event={testEvent} todoCollections={testTodoCollections} />);
    expect(screen.getByText(testEvent.type.name)).toBeDefined();
  });

  it('renders the date information', () => {
    render(<EventDetails event={testEvent} todoCollections={testTodoCollections} />);
    expect(screen.getByText('Sep 28, 2024 at 6:30 PM - Sep 30, 2024 at 10:30 PM')).toBeDefined();
  });

  it('renders the description', () => {
    render(<EventDetails event={testEvent} todoCollections={testTodoCollections} />);
    expect(screen.getByText(testEvent.description)).toBeDefined();
  });

  it('renders a location section', () => {
    render(<EventDetails event={testEvent} todoCollections={testTodoCollections} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Location' })).toBeDefined();
  });

  describe('todo section', () => {
    it('renders the section header', () => {
      render(<EventDetails event={testEvent} todoCollections={testTodoCollections} />);
      expect(screen.getByRole('heading', { level: 2, name: 'Todos' })).toBeDefined();
    });

    it('renders the section header', () => {
      render(<EventDetails event={testEvent} todoCollections={testTodoCollections} />);
      expect(screen.getByRole('button', { name: 'Add Todo Collection' })).toBeDefined();
    });

    it('renders the todo collections', () => {
      render(<EventDetails event={testEvent} todoCollections={testTodoCollections} />);
      testTodoCollections
        .filter((x) => !x.isComplete)
        .forEach((c) => expect(screen.getByRole('heading', { level: 3, name: c.name })).toBeDefined());
    });
  });
});
