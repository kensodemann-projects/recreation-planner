'use client';

import NoteEditor from '@/app/adventure/notes/ui/note-editor';
import { Note } from '@/models';
import { redirectToEquipmentDetails } from '../../utils';
import { updateConfirmed } from './actions';

type UpdateNoteProperties = {
  note: Note;
};

const UpdateNote = ({ note }: UpdateNoteProperties) => {
  return (
    <>
      <NoteEditor
        note={note}
        onConfirm={(evt) => updateConfirmed(evt as Note)}
        onCancel={() => redirectToEquipmentDetails(note.equipmentRid!)}
      />
    </>
  );
};

export default UpdateNote;
