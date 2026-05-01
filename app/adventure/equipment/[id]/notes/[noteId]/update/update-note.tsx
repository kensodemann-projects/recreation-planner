'use client';

import NoteEditor from '@/app/adventure/notes/ui/note-editor';
import { Note } from '@/models';
import { updateConfirmed } from './actions';
import { redirectToDetails } from '@/utils/navigation';

type UpdateNoteProperties = {
  note: Note;
};

const UpdateNote = ({ note }: UpdateNoteProperties) => {
  return (
    <>
      <NoteEditor
        note={note}
        onConfirm={(evt) => updateConfirmed(evt as Note)}
        onCancel={() => redirectToDetails('equipment', note.equipmentRid!, 'Notes')}
      />
    </>
  );
};

export default UpdateNote;
