'use client';

import NoteEditor from '@/app/adventure/notes/ui/note-editor';
import { redirectToDetails } from '@/utils/navigation';
import { createConfirmed } from './actions';

type CreateNoteProps = {
  eventRid: number;
};

const CreateNote = ({ eventRid }: CreateNoteProps) => {
  return (
    <>
      <NoteEditor
        onConfirm={(note) => createConfirmed({ ...note, eventRid })}
        onCancel={() => redirectToDetails('events', eventRid, 'Notes')}
      />
    </>
  );
};

export default CreateNote;
