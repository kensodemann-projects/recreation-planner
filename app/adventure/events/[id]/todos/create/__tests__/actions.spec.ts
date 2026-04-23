import { TODO_COLLECTIONS } from '@/app/adventure/todos/__mocks__/data';
import { addTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createConfirmed } from '../actions';

vi.mock('@/app/adventure/todos/data');
vi.mock('next/navigation');

const todos: TodoCollection = { ...TODO_COLLECTIONS.find((c) => c.eventRid !== null)!, id: undefined, eventRid: 58 };

describe('event todos: createConfirmed', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls addTodoCollection with the specified todo collection', async () => {
    await createConfirmed(todos);
    expect(addTodoCollection).toHaveBeenCalledExactlyOnceWith(todos);
  });

  describe('when addTodoCollection succeeds', () => {
    beforeEach(() => {
      (addTodoCollection as any).mockResolvedValue({ ...todos, id: 73 });
    });

    it('redirects to the event details page', async () => {
      await createConfirmed(todos);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/events/58?lastActivity=Todos');
    });
  });

  describe('when addTodoCollection fails', () => {
    beforeEach(() => {
      (addTodoCollection as any).mockResolvedValue(null);
    });

    it('redirects to /error', async () => {
      await createConfirmed(todos);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
