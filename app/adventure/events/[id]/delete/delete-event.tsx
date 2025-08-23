'use client';

import CannotDelete from '@/app/ui/cannot-delete';
import ConfirmDelete from '@/app/ui/confirm-delete';
import { Event } from '@/models';
import { useSearchParams } from 'next/navigation';
import { deleteAborted, deleteConfirmed } from './actions';

interface DeleteEventProps {
  event: Event;
  canDelete: boolean;
}

const DeleteEvent = ({ event, canDelete }: DeleteEventProps) => {
  const sp = useSearchParams();
  const callingPage = sp?.get('callingPage') || '';

  return canDelete ? (
    <ConfirmDelete
      entityName={event.name}
      onConfirm={() => deleteConfirmed(event, callingPage)}
      onDeny={() => deleteAborted(callingPage)}
    />
  ) : (
    <CannotDelete entityName={event.name} onClick={() => deleteAborted(callingPage)} />
  );
};

export default DeleteEvent;
