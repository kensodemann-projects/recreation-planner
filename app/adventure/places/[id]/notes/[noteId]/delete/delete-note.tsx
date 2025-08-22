'use client';

import CannotDelete from '@/app/ui/cannot-delete';
import ConfirmDelete from '@/app/ui/confirm-delete';
import { Note } from '@/models';
import { deleteAborted, deleteConfirmed } from './actions';

interface DeleteNoteProps {
  placeId: number;
  note: Note;
  canDelete: boolean;
}

const DeleteNote = ({ note, canDelete, placeId }: DeleteNoteProps) => {
  return canDelete ? (
    <ConfirmDelete
      entityName={note.name}
      onConfirm={() => deleteConfirmed(placeId, note)}
      onDeny={() => deleteAborted(placeId)}
    />
  ) : (
    <CannotDelete entityName={note.name} onClick={() => deleteAborted(placeId)} />
  );
};

export default DeleteNote;
