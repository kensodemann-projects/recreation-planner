'use client';

import NoteEditor from '@/app/adventure/notes/ui/note-editor';
import { Note } from '@/models';
import { useRouter } from 'next/navigation';
import { updateConfirmed } from './actions';

type UpdateNoteProperties = {
  note: Note;
};

const UpdateNote = ({ note }: UpdateNoteProperties) => {
  const router = useRouter();

  return (
    <>
      <NoteEditor note={note} onConfirm={(evt) => updateConfirmed(evt as Note)} onCancel={() => router.back()} />
    </>
  );
};

export default UpdateNote;
