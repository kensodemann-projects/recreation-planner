'use client';

import CannotDelete from '@/app/ui/cannot-delete';
import ConfirmDelete from '@/app/ui/confirm-delete';
import { ItineraryItem } from '@/models';
import { deleteAborted, deleteConfirmed } from './actions';

interface DeleteNoteProps {
  eventId: number;
  item: ItineraryItem;
  canDelete: boolean;
}

const DeleteNote = ({ item, canDelete, eventId }: DeleteNoteProps) => {
  return canDelete ? (
    <ConfirmDelete
      entityName={item.name}
      onConfirm={() => deleteConfirmed(eventId, item)}
      onDeny={() => deleteAborted(eventId)}
    />
  ) : (
    <CannotDelete entityName={item.name} onClick={() => deleteAborted(eventId)} />
  );
};

export default DeleteNote;
