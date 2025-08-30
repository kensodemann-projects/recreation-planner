import { EQUIPMENT } from '@/app/adventure/equipment/__mocks__/data';
import { TodoCollection } from '@/models';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { addTodoItem, updateTodoItem } from '../../data';
import TodoCollectionCard from '../todo-collection-card';
import { EVENTS } from '@/app/adventure/events/__mocks__/data';

vi.mock('../../data');

describe('TODO Collection Card', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('renders the title', () => {
    render(
      <TodoCollectionCard
        baseHref={`/adventure/todos/${TEST_COLLECTION.id}/update`}
        todoCollection={TEST_COLLECTION}
      />,
    );
    expect(screen.getByRole('heading', { level: 3, name: TEST_COLLECTION.name })).toBeDefined();
  });

  it('renders the due date if the collection has one', () => {
    render(
      <TodoCollectionCard
        baseHref={`/adventure/todos/${TEST_COLLECTION.id}/update`}
        todoCollection={TEST_COLLECTION}
      />,
    );
    expect(screen.getByText('Due Date:')).toBeDefined();
    expect(screen.getByText('Mar 17, 2025')).toBeDefined();
  });

  it('does not render the due date if the collection does not have one', () => {
    render(
      <TodoCollectionCard
        baseHref={`/adventure/todos/${TEST_COLLECTION.id}/update`}
        todoCollection={{ ...TEST_COLLECTION, dueDate: null }}
      />,
    );
    expect(screen.queryByText('Due Date:')).toBeNull();
  });

  it('renders the description', () => {
    render(
      <TodoCollectionCard
        baseHref={`/adventure/todos/${TEST_COLLECTION.id}/update`}
        todoCollection={TEST_COLLECTION}
      />,
    );
    expect(screen.getByText(TEST_COLLECTION.description!)).toBeDefined();
  });

  it('renders the todo items', () => {
    render(
      <TodoCollectionCard
        baseHref={`/adventure/todos/${TEST_COLLECTION.id}/update`}
        todoCollection={TEST_COLLECTION}
      />,
    );
    const items = screen.getByTestId('todo-items');
    expect(within(items).getAllByRole('checkbox').length).toEqual(TEST_COLLECTION.todoItems.length);
  });

  it('renders the open items first, completed items last', () => {
    render(
      <TodoCollectionCard
        baseHref={`/adventure/todos/${TEST_COLLECTION.id}/update`}
        todoCollection={TEST_COLLECTION}
      />,
    );
    const elements = screen.getAllByRole('checkbox');
    expect(elements[0].parentElement!.textContent).toEqual('Test the fetching');
    expect(elements[1].parentElement!.textContent).toEqual('Create an item');
    expect(elements[2].parentElement!.textContent).toEqual('Fetch the data');
    expect(elements[3].parentElement!.textContent).toEqual('Create the collection');
  });

  describe('when rendered as a primary entity', () => {
    it('displays the equipment name for equipment related collections', () => {
      const collection = { ...TEST_COLLECTION, equipmentRid: EQUIPMENT[0].id!, equipment: EQUIPMENT[0] };
      render(<TodoCollectionCard baseHref="/adventure/todos" todoCollection={collection} />);
      expect(screen.getByText('For Equipment:')).toBeDefined();
      expect(screen.getByText(EQUIPMENT[0].name)).toBeDefined();
    });

    it('displays the event name for event related collections', () => {
      const collection = { ...TEST_COLLECTION, eventRid: EVENTS[0].id!, event: EVENTS[0] };
      render(<TodoCollectionCard baseHref="/adventure/todos" todoCollection={collection} />);
      expect(screen.getByText('For Event:')).toBeDefined();
      expect(screen.getByText(EVENTS[0].name)).toBeDefined();
    });

    it('does not display an assoication if there is not one', () => {
      render(<TodoCollectionCard baseHref="/adventure/todos" todoCollection={TEST_COLLECTION} />);
      expect(screen.queryByText('For Equipment:')).toBeNull();
      expect(screen.queryByText('For Event:')).toBeNull();
    });
  });

  it('allows the user to update todo item text', async () => {
    const item = TEST_COLLECTION.todoItems.find((x) => x.name === 'Fetch the data');
    const user = userEvent.setup();
    render(
      <TodoCollectionCard
        baseHref={`/adventure/todos/${TEST_COLLECTION.id}/update`}
        todoCollection={TEST_COLLECTION}
      />,
    );
    await user.click(screen.getByText('Fetch the data'));
    await user.type(screen.getByRole('textbox'), ' and do something with it');
    await user.click(screen.getByTestId('save-button'));
    expect(updateTodoItem).toHaveBeenCalledExactlyOnceWith({
      ...item,
      name: item!.name + ' and do something with it',
    });
  });

  it('allows items to be checked', async () => {
    const item = TEST_COLLECTION.todoItems.find((x) => x.name === 'Create an item');
    const user = userEvent.setup();
    render(
      <TodoCollectionCard
        baseHref={`/adventure/todos/${TEST_COLLECTION.id}/update`}
        todoCollection={TEST_COLLECTION}
      />,
    );
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
    render(
      <TodoCollectionCard
        baseHref={`/adventure/todos/${TEST_COLLECTION.id}/update`}
        todoCollection={TEST_COLLECTION}
      />,
    );
    const elements = screen.getAllByRole('checkbox');
    await user.click(elements[2]);
    expect(updateTodoItem).toHaveBeenCalledExactlyOnceWith({
      ...item,
      isComplete: false,
    });
  });

  describe('add button', () => {
    it('adds a new TODO', async () => {
      const user = userEvent.setup();
      render(
        <TodoCollectionCard
          baseHref={`/adventure/todos/${TEST_COLLECTION.id}/update`}
          todoCollection={TEST_COLLECTION}
        />,
      );
      await user.click(screen.getByRole('button', { name: 'Add new Todo Item' }));
      expect(addTodoItem).toHaveBeenCalledExactlyOnceWith({ isComplete: false, name: '', todoCollectionRid: 7314159 });
    });

    it('displays the new TODO', async () => {
      (addTodoItem as Mock).mockResolvedValue({ id: 932, name: '', todoCollectionRid: 7314159, isComplete: false });
      const user = userEvent.setup();
      render(
        <TodoCollectionCard
          baseHref={`/adventure/todos/${TEST_COLLECTION.id}/update`}
          todoCollection={TEST_COLLECTION}
        />,
      );
      await user.click(screen.getByRole('button', { name: 'Add new Todo Item' }));
      const items = screen.getByTestId('todo-items');
      expect(within(items).getAllByRole('checkbox').length).toEqual(TEST_COLLECTION.todoItems.length + 1);
    });
  });
});

const TEST_COLLECTION: TodoCollection = {
  id: 7314159,
  name: 'This is a test collection',
  description: 'The point of this collection is simply to do a thing',
  dueDate: '2025-03-17',
  isComplete: false,
  eventRid: null,
  equipmentRid: null,
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
