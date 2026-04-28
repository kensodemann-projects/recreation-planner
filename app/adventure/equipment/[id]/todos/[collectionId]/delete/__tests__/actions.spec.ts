import { TODO_COLLECTIONS } from '@/app/adventure/todos/__mocks__/data';
import { deleteTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { deleteAborted, deleteConfirmed } from '../actions';

vi.mock('@/app/adventure/todos/data');
vi.mock('next/navigation');

const collection: TodoCollection = { ...TODO_COLLECTIONS.find((x) => x.id === 1)!, equipmentRid: 42 };

describe('equipment TODOs: delete actions', () => {
  beforeEach(() => vi.clearAllMocks());

  describe('deleteConfirmed', () => {
    it('calls deleteTodoCollection', async () => {
      await deleteConfirmed(19, collection).catch(() => {});
      expect(deleteTodoCollection).toHaveBeenCalledExactlyOnceWith(collection);
    });

    it('redirects to the equipment details page if the delete succeeds', async () => {
      (deleteTodoCollection as Mock).mockResolvedValue(true);
      await deleteConfirmed(19, collection).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/equipment/19?lastActivity=Todos');
    });

    it('redirects to /error if the delete fails', async () => {
      (deleteTodoCollection as Mock).mockResolvedValue(false);
      await deleteConfirmed(19, collection).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/error');
    });
  });

  describe('deleteAborted', () => {
    it('does not call deleteTodoCollection', async () => {
      await deleteAborted(19).catch(() => {});
      expect(deleteTodoCollection).not.toHaveBeenCalled();
    });

    it('redirects to the equipment details page', async () => {
      await deleteAborted(19).catch(() => {});
      expect(redirect).toHaveBeenCalledExactlyOnceWith('/adventure/equipment/19?lastActivity=Todos');
    });
  });
});
