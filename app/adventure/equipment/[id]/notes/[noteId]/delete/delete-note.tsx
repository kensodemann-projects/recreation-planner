'use client';

import CannotDelete from '@/app/ui/cannot-delete';
import ConfirmDelete from '@/app/ui/confirm-delete';
import { Note } from '@/models';
import { deleteAborted, deleteConfirmed } from './actions';

interface DeleteNoteProps {
  equipmentId: number;
  note: Note;
  canDelete: boolean;
}

const DeleteNote = ({ note, canDelete, equipmentId }: DeleteNoteProps) => {
  return canDelete ? (
    <ConfirmDelete
      entityName={note.name}
      onConfirm={() => deleteConfirmed(equipmentId, note)}
      onDeny={() => deleteAborted(equipmentId)}
    />
  ) : (
    <CannotDelete entityName={note.name} onClick={() => deleteAborted(equipmentId)} />
  );
};

export default DeleteNote;
