import { TodoCollection } from '@/models';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import TodoCollectionCard from '../todo-collection-card';
import userEvent from '@testing-library/user-event';
import { updateTodoItem } from '../../data';

vi.mock('../../data');

describe('TODO Collection Card', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('renders the title', () => {
    render(<TodoCollectionCard todoCollection={TEST_COLLECTION} />);
    expect(screen.getByRole('heading', { level: 2, name: TEST_COLLECTION.name })).toBeDefined();
  });

  it('renders the description', () => {
    render(<TodoCollectionCard todoCollection={TEST_COLLECTION} />);
    expect(screen.getByText(TEST_COLLECTION.description!)).toBeDefined();
  });

  it('renders the todo items', () => {
    render(<TodoCollectionCard todoCollection={TEST_COLLECTION} />);
    expect(screen.getAllByRole('checkbox').length).toEqual(TEST_COLLECTION.todoItems.length);
  });

  it('renders the open items first, completed items last', () => {
    render(<TodoCollectionCard todoCollection={TEST_COLLECTION} />);
    const elements = screen.getAllByRole('checkbox');
    expect(elements[0].parentElement!.textContent).toEqual('Test the fetching');
    expect(elements[1].parentElement!.textContent).toEqual('Create an item');
    expect(elements[2].parentElement!.textContent).toEqual('Fetch the data');
    expect(elements[3].parentElement!.textContent).toEqual('Create the collection');
  });

  it('allows the user to update todo item text', async () => {
    const item = TEST_COLLECTION.todoItems.find((x) => x.name === 'Fetch the data');
    const user = userEvent.setup();
    render(<TodoCollectionCard todoCollection={TEST_COLLECTION} />);
    await user.click(screen.getByText('Fetch the data'));
    await user.type(screen.getByRole('textbox'), ' and do something with it');
    await user.tab();
    expect(updateTodoItem).toHaveBeenCalledExactlyOnceWith({
      ...item,
      name: item!.name + ' and do something with it',
    });
  });

  it('allows items to be checked', async () => {
    const item = TEST_COLLECTION.todoItems.find((x) => x.name === 'Create an item');
    const user = userEvent.setup();
    render(<TodoCollectionCard todoCollection={TEST_COLLECTION} />);
    const elements = screen.getAllByRole('checkbox');
    await user.click(elements[1]);
    expect(updateTodoItem).toHaveBeenCalledExactlyOnceWith({
      ...item,
      isComplete: true,
    });
  });

  it('allows items to be unchecked', async () => {
    const item = TEST_COLLECTION.todoItems.find((x) => x.name === 'Fetch the data');
    const user = userEvent.setup();
    render(<TodoCollectionCard todoCollection={TEST_COLLECTION} />);
    const elements = screen.getAllByRole('checkbox');
    await user.click(elements[2]);
    expect(updateTodoItem).toHaveBeenCalledExactlyOnceWith({
      ...item,
      isComplete: false,
    });
  });
});

const TEST_COLLECTION: TodoCollection = {
  id: 7314159,
  name: 'This is a test collection',
  description: 'The point of this collection is simply to do a thing',
  dueDate: '2025-03-17',
  isComplete: false,
  todoItems: [
    {
      id: 17,
      name: 'Fetch the data',
      isComplete: true,
      todoCollectionRid: 7314159,
    },
    {
      id: 21,
      name: 'Test the fetching',
      isComplete: false,
      todoCollectionRid: 7314159,
    },
    {
      id: 19,
      name: 'Create the collection',
      isComplete: true,
      todoCollectionRid: 7314159,
    },
    {
      id: 82,
      name: 'Create an item',
      isComplete: false,
      todoCollectionRid: 7314159,
    },
  ],
};
