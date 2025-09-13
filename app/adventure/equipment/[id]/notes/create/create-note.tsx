'use client';

import NoteEditor from '@/app/adventure/notes/ui/note-editor';
import { redirectToEquipmentDetails } from '../utils';
import { createConfirmed } from './actions';

type CreateNoteProps = {
  equipmentRid: number;
};

const CreateNote = ({ equipmentRid }: CreateNoteProps) => {
  return (
    <>
      <NoteEditor
        onConfirm={(note) => createConfirmed({ ...note, equipmentRid })}
        onCancel={() => redirectToEquipmentDetails(equipmentRid)}
      />
    </>
  );
};

export default CreateNote;
