import { TODO_COLLECTIONS } from '@/app/adventure/todos/__mocks__/data';
import { updateTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { updateConfirmed } from '../actions';

vi.mock('@/app/adventure/todos/data');
vi.mock('next/navigation');

const todoCollection: TodoCollection = TODO_COLLECTIONS.find((c) => c.id === 1)!;

describe.each([
  {
    page: 'Home',
    path: '/adventure',
  },
  {
    page: 'Default',
    path: '/adventure/todos',
  },
])('todos: updateConfirmed for $page', ({ page, path }) => {
  beforeEach(() => vi.clearAllMocks());

  it('calls updateTodoCollection with the specified collection', async () => {
    await updateConfirmed(todoCollection, page);
    expect(updateTodoCollection).toHaveBeenCalledExactlyOnceWith(todoCollection);
  });

  describe('when the update succeeds', () => {
    beforeEach(() => {
      (updateTodoCollection as Mock).mockResolvedValue(todoCollection);
    });

    it('redirects to the todos list page', async () => {
      await updateConfirmed(todoCollection, page);
      expect(redirect).toHaveBeenCalledExactlyOnceWith(path);
    });
  });

  describe('when the update fails', () => {
    beforeEach(() => {
      (updateTodoCollection as Mock).mockResolvedValue(null);
    });

    it('redirects to /error', async () => {
      await updateConfirmed(todoCollection, page);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
