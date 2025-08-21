'use client';

import CannotDelete from '@/app/ui/cannot-delete';
import ConfirmDelete from '@/app/ui/confirm-delete';
import { Note } from '@/models';
import { deleteAborted, deleteConfirmed } from './actions';

interface DeleteNoteProps {
  eventId: number;
  note: Note;
  canDelete: boolean;
}

const DeleteNote = ({ note, canDelete, eventId }: DeleteNoteProps) => {
  return canDelete ? (
    <ConfirmDelete
      entityName={note.name}
      onConfirm={() => deleteConfirmed(eventId, note)}
      onDeny={() => deleteAborted(eventId)}
    />
  ) : (
    <CannotDelete entityName={note.name} onClick={() => deleteAborted(eventId)} />
  );
};

export default DeleteNote;
