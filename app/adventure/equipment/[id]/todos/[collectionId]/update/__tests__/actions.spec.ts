import { TODO_COLLECTIONS } from '@/app/adventure/todos/__mocks__/data';
import { updateTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { updateConfirmed } from '../actions';

vi.mock('@/app/adventure/todos/data');
vi.mock('next/navigation');

const collection: TodoCollection = { ...TODO_COLLECTIONS.find((x) => x.id === 1)!, equipmentRid: 42 };

describe('equipment TODOs: updateConfirmed', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls updateTodoCollection with the passed collection', async () => {
    await updateConfirmed(collection);
    expect(updateTodoCollection).toHaveBeenCalledExactlyOnceWith(collection);
  });

  describe('on success', () => {
    beforeEach(() => {
      (updateTodoCollection as Mock).mockResolvedValue(collection);
    });

    it('redirects to the equipment details page', async () => {
      await updateConfirmed(collection);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/equipment/42?lastActivity=Todos');
    });
  });

  describe('on failure', () => {
    beforeEach(() => {
      (updateTodoCollection as Mock).mockResolvedValue(null);
    });

    it('redirects to error', async () => {
      await updateConfirmed(collection);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });
});
