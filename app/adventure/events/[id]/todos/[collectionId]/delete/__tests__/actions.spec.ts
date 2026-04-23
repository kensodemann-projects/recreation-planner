import { TODO_COLLECTIONS } from '@/app/adventure/todos/__mocks__/data';
import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { describe, beforeEach, vi, it, expect } from 'vitest';
import { deleteConfirmed, deleteAborted } from '../actions';
import { deleteTodoCollection } from '@/app/adventure/todos/data';

vi.mock('@/app/adventure/todos/data');
vi.mock('next/navigation');

const todos: TodoCollection = TODO_COLLECTIONS.find((c) => c.eventRid !== null)!;

describe('event todos: delete actions', () => {
  beforeEach(() => vi.clearAllMocks());

  describe('deleteConfirmed', () => {
    it('calls deleteTodoCollection', async () => {
      await deleteConfirmed(324, todos);
      expect(deleteTodoCollection).toHaveBeenCalledExactlyOnceWith(todos);
    });

    it('redirects to the event details page', async () => {
      await deleteConfirmed(324, todos);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/events/324?lastActivity=Todos');
    });
  });

  describe('deleteAborted', () => {
    it('does not call deleteTodoCollection', async () => {
      await deleteAborted(324);
      expect(deleteTodoCollection).not.toHaveBeenCalled();
    });

    it('redirects to the event details page', async () => {
      await deleteAborted(324);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/events/324?lastActivity=Todos');
    });
  });
});
