'use client';

import NoteEditor from '@/app/adventure/notes/ui/note-editor';
import { redirectToEventDetails } from '../utils';
import { createConfirmed } from './actions';

type CreateNoteProps = {
  eventRid: number;
};

const CreateNote = ({ eventRid }: CreateNoteProps) => {
  return (
    <>
      <NoteEditor
        onConfirm={(note) => createConfirmed({ ...note, eventRid })}
        onCancel={() => redirectToEventDetails(eventRid)}
      />
    </>
  );
};

export default CreateNote;
