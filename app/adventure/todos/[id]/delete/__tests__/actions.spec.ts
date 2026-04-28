import { TODO_COLLECTIONS } from '@/app/adventure/todos/__mocks__/data';
import { deleteTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { deleteAborted, deleteConfirmed } from '../actions';

vi.mock('@/app/adventure/todos/data');
vi.mock('next/navigation');

const todoCollection: TodoCollection = TODO_COLLECTIONS.find((c) => c.id === 1)!;

describe('todos: delete actions', () => {
  beforeEach(() => vi.clearAllMocks());

  describe.each([
    {
      page: 'Home',
      path: '/adventure',
    },
    {
      page: 'Default',
      path: '/adventure/todos',
    },
  ])('deleteConfirmed for $page', ({ page, path }) => {
    it('calls deleteTodoCollection', async () => {
      await deleteConfirmed(todoCollection, page).catch(() => {});
      expect(deleteTodoCollection).toHaveBeenCalledExactlyOnceWith(todoCollection);
    });

    it('redirects to the correct page if the delete succeeds', async () => {
      (deleteTodoCollection as Mock).mockResolvedValue(true);
      await deleteConfirmed(todoCollection, page).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith(path);
    });

    it('redirects to /error if the delete fails', async () => {
      (deleteTodoCollection as Mock).mockResolvedValue(false);
      await deleteConfirmed(todoCollection, page).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });

  describe.each([
    {
      page: 'Home',
      path: '/adventure',
    },
    {
      page: 'Default',
      path: '/adventure/todos',
    },
  ])('deleteAborted for $page', ({ page, path }) => {
    it('does not call deleteTodoCollection', async () => {
      await deleteAborted(page).catch(() => {});
      expect(deleteTodoCollection).not.toHaveBeenCalled();
    });

    it('redirects to /adventure/todos', async () => {
      await deleteAborted(page).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith(path);
    });
  });
});
