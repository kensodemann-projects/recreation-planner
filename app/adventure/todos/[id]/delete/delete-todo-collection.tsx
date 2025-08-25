'use client';

import CannotDelete from '@/app/ui/cannot-delete';
import ConfirmDelete from '@/app/ui/confirm-delete';
import { TodoCollection } from '@/models';
import { useSearchParams } from 'next/navigation';
import { deleteAborted, deleteConfirmed } from './actions';

interface DeleteTodoCollectionProps {
  collection: TodoCollection;
  canDelete: boolean;
}

const DeleteTodoCollection = ({ collection, canDelete }: DeleteTodoCollectionProps) => {
  const sp = useSearchParams();
  const callingPage = sp?.get('callingPage') || '';

  return canDelete ? (
    <ConfirmDelete
      entityName={collection.name}
      onConfirm={() => deleteConfirmed(collection, callingPage)}
      onDeny={() => deleteAborted(callingPage)}
    />
  ) : (
    <CannotDelete entityName={collection.name} onClick={() => deleteAborted(callingPage)} />
  );
};

export default DeleteTodoCollection;
