'use client';

import NoteEditor from '@/app/adventure/notes/ui/note-editor';
import { useRouter } from 'next/navigation';
import { createConfirmed } from './actions';

type CreateNoteProps = {
  placeRid: number | null;
};

const CreateNote = ({ placeRid }: CreateNoteProps) => {
  const router = useRouter();

  return (
    <>
      <NoteEditor onConfirm={(note) => createConfirmed({ ...note, placeRid })} onCancel={() => router.back()} />
    </>
  );
};

export default CreateNote;
