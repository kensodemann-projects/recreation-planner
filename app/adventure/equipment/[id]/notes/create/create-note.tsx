'use client';

import NoteEditor from '@/app/adventure/notes/ui/note-editor';
import { redirectToDetails } from '@/utils/navigation';
import { createConfirmed } from './actions';

type CreateNoteProps = {
  equipmentRid: number;
};

const CreateNote = ({ equipmentRid }: CreateNoteProps) => {
  return (
    <>
      <NoteEditor
        onConfirm={(note) => createConfirmed({ ...note, equipmentRid })}
        onCancel={() => redirectToDetails('equipment', equipmentRid, 'Notes')}
      />
    </>
  );
};

export default CreateNote;
