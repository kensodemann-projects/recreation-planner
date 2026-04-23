import { TODO_COLLECTIONS } from '@/app/adventure/todos/__mocks__/data';
import { updateTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { updateConfirmed } from '../actions';

vi.mock('@/app/adventure/todos/data');
vi.mock('next/navigation');

const todos: TodoCollection = { ...TODO_COLLECTIONS.find((c) => c.eventRid !== null)!, id: undefined, eventRid: 58 };

describe('event todos: updateConfirmed', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls updateTodoCollection with the specified todo collection', async () => {
    await updateConfirmed(todos);
    expect(updateTodoCollection).toHaveBeenCalledExactlyOnceWith(todos);
  });

  describe('when the update succeeds', () => {
    beforeEach(() => {
      (updateTodoCollection as Mock).mockResolvedValue({ ...todos, id: 73 });
    });

    it('redirects to the event details page', async () => {
      await updateConfirmed(todos);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/events/58?lastActivity=Todos');
    });
  });

  describe('when the update fails', () => {
    beforeEach(() => {
      (updateTodoCollection as Mock).mockResolvedValue(null);
    });

    it('redirects to /error', async () => {
      await updateConfirmed(todos);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
