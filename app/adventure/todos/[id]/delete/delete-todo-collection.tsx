'use client';

import CannotDelete from '@/app/ui/cannot-delete';
import ConfirmDelete from '@/app/ui/confirm-delete';
import { TodoCollection } from '@/models';
import { deleteAborted, deleteConfirmed } from './actions';

interface DeleteTodoCollectionProps {
  collection: TodoCollection;
  canDelete: boolean;
}

const DeleteTodoCollection = ({ collection, canDelete }: DeleteTodoCollectionProps) => {
  return canDelete ? (
    <ConfirmDelete entityName={collection.name} onConfirm={() => deleteConfirmed(collection)} onDeny={deleteAborted} />
  ) : (
    <CannotDelete entityName={collection.name} onClick={deleteAborted} />
  );
};

export default DeleteTodoCollection;
