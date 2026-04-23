import { TODO_COLLECTIONS } from '@/app/adventure/todos/__mocks__/data';
import { deleteTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { deleteAborted, deleteConfirmed } from '../actions';

vi.mock('@/app/adventure/todos/data');
vi.mock('next/navigation');

const collection: TodoCollection = { ...TODO_COLLECTIONS.find((x) => x.id === 1)!, equipmentRid: 42 };

describe('equipment TODOs: delete actions', () => {
  beforeEach(() => vi.clearAllMocks());

  describe('deleteConfirmed', () => {
    it('calls deleteTodoCollection', async () => {
      await deleteConfirmed(19, collection);
      expect(deleteTodoCollection).toHaveBeenCalledExactlyOnceWith(collection);
    });

    it('redirects to the equipment details page', async () => {
      await deleteConfirmed(19, collection);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/equipment/19?lastActivity=Todos');
    });
  });

  describe('deleteAborted', () => {
    it('does not call deleteTodoCollection', async () => {
      await deleteAborted(19);
      expect(deleteTodoCollection).not.toHaveBeenCalled();
    });

    it('redirects to the equipment details page', async () => {
      await deleteAborted(19);
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/equipment/19?lastActivity=Todos');
    });
  });
});
