import { TodoCollection } from '@/models';
import { TODO_COLLECTIONS } from '@/app/adventure/todos/__mocks__/data';
import { redirect } from 'next/navigation';
import { describe, beforeEach, vi, it, expect } from 'vitest';
import { createConfirmed } from '../actions';
import { addTodoCollection } from '@/app/adventure/todos/data';

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
      (addTodoCollection as any).mockResolvedValue({ ...todoCollection, id: 73 });
    });

    it('redirects to the todo collections list page', async () => {
      await createConfirmed(todoCollection);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/todos');
    });
  });

  describe('when addTodoCollection fails', () => {
    beforeEach(() => {
      (addTodoCollection as any).mockResolvedValue(null);
    });

    it('redirects to /error', async () => {
      await createConfirmed(todoCollection);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
