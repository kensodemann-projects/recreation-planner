import { TODO_COLLECTIONS } from '@/app/adventure/todos/__mocks__/data';
import { addTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { createConfirmed } from '../actions';

vi.mock('@/app/adventure/todos/data');
vi.mock('next/navigation');

const todoCollection: TodoCollection = { ...TODO_COLLECTIONS.find((c) => c.id === 1)!, id: undefined };

describe('todo collection: createConfirmed', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls addTodoCollection with the specified collection', async () => {
    await createConfirmed(todoCollection);
    expect(addTodoCollection).toHaveBeenCalledExactlyOnceWith(todoCollection);
  });

  describe('when addTodoCollection succeeds', () => {
    beforeEach(() => {
      (addTodoCollection as Mock).mockResolvedValue({ ...todoCollection, id: 73 });
    });

    it('redirects to the todo collections list page', async () => {
      await createConfirmed(todoCollection);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/todos');
    });
  });

  describe('when addTodoCollection fails', () => {
    beforeEach(() => {
      (addTodoCollection as Mock).mockResolvedValue(null);
    });

    it('redirects to /error', async () => {
      await createConfirmed(todoCollection);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
