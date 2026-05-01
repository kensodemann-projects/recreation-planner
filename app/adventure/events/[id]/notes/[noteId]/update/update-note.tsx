'use client';

import NoteEditor from '@/app/adventure/notes/ui/note-editor';
import { Note } from '@/models';
import { redirectToDetails } from '@/utils/navigation';
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
        onCancel={() => redirectToDetails('events', note.eventRid!, 'Notes')}
      />
    </>
  );
};

export default UpdateNote;
