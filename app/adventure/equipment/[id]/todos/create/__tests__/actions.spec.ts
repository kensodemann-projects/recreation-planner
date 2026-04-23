import { TODO_COLLECTIONS } from '@/app/adventure/todos/__mocks__/data';
import { addTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { createConfirmed } from '../actions';

vi.mock('@/app/adventure/todos/data');
vi.mock('next/navigation');

const collection: TodoCollection = { ...TODO_COLLECTIONS.find((x) => x.id === 2)!, id: undefined, equipmentRid: 42 };

describe('equipment todos: createConfirmed', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls addTodoCollection with the specified collection', async () => {
    await createConfirmed(collection);
    expect(addTodoCollection).toHaveBeenCalledExactlyOnceWith(collection);
  });

  describe('on success', () => {
    beforeEach(() => {
      (addTodoCollection as Mock).mockResolvedValue({ ...collection, id: 73 });
    });

    it('redirects to the equipment details page', async () => {
      await createConfirmed(collection);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/equipment/42?lastActivity=Todos');
    });
  });

  describe('on failure', () => {
    beforeEach(() => {
      (addTodoCollection as Mock).mockResolvedValue(null);
    });

    it('redirects to error', async () => {
      await createConfirmed(collection);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
