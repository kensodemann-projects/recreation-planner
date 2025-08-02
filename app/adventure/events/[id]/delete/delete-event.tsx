'use client';

import CannotDelete from '@/app/ui/cannot-delete';
import ConfirmDelete from '@/app/ui/confirm-delete';
import { Event } from '@/models';
import { deleteAborted, deleteConfirmed } from './actions';

interface DeleteEventProps {
  event: Event;
  canDelete: boolean;
}

const DeleteEvent = ({ event, canDelete }: DeleteEventProps) => {
  return canDelete ? (
    <ConfirmDelete entityName={event.name} onConfirm={() => deleteConfirmed(event)} onDeny={deleteAborted} />
  ) : (
    <CannotDelete entityName={event.name} onClick={deleteAborted} />
  );
};

export default DeleteEvent;
