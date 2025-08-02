'use client';

import CannotDelete from '@/app/ui/cannot-delete';
import ConfirmDelete from '@/app/ui/confirm-delete';
import { TodoCollection } from '@/models';
import { deleteAborted, deleteConfirmed } from './actions';

interface DeleteTodoCollectionProps {
  equipmentId: number;
  collection: TodoCollection;
  canDelete: boolean;
}

const DeleteTodoCollection = ({ collection, canDelete, equipmentId }: DeleteTodoCollectionProps) => {
  return canDelete ? (
    <ConfirmDelete
      entityName={collection.name}
      onConfirm={() => deleteConfirmed(equipmentId, collection)}
      onDeny={() => deleteAborted(equipmentId)}
    />
  ) : (
    <CannotDelete entityName={collection.name} onClick={() => deleteAborted(equipmentId)} />
  );
};

export default DeleteTodoCollection;
