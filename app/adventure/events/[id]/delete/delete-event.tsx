'use client';

import CannotDelete from '@/app/ui/cannot-delete';
import ConfirmDelete from '@/app/ui/confirm-delete';
import { Event } from '@/models';
import { deleteEventAborted, deleteEventConfirmed } from './actions';

interface DeleteEventProps {
  event: Event;
  canDelete: boolean;
}

const DeleteEvent = ({ event, canDelete }: DeleteEventProps) => {
  return canDelete ? (
    <ConfirmDelete entityName={event.name} onConfirm={() => deleteEventConfirmed(event)} onDeny={deleteEventAborted} />
  ) : (
    <CannotDelete entityName={event.name} onClick={deleteEventAborted} />
  );
};

export default DeleteEvent;
