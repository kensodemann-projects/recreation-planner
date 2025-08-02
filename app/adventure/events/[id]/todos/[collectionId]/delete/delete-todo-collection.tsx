'use client';

import CannotDelete from '@/app/ui/cannot-delete';
import ConfirmDelete from '@/app/ui/confirm-delete';
import { TodoCollection } from '@/models';
import { deleteAborted, deleteConfirmed } from './actions';

interface DeleteTodoCollectionProps {
  eventId: number;
  collection: TodoCollection;
  canDelete: boolean;
}

const DeleteTodoCollection = ({ collection, canDelete, eventId }: DeleteTodoCollectionProps) => {
  return canDelete ? (
    <ConfirmDelete
      entityName={collection.name}
      onConfirm={() => deleteConfirmed(eventId, collection)}
      onDeny={() => deleteAborted(eventId)}
    />
  ) : (
    <CannotDelete entityName={collection.name} onClick={() => deleteAborted(eventId)} />
  );
};

export default DeleteTodoCollection;
