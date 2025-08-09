'use client';

import NoteEditor from '@/app/adventure/notes/ui/note-editor';
import { useRouter } from 'next/navigation';
import { createConfirmed } from './actions';

type CreateNoteProps = {
  eventRid: number | null;
};

const CreateNote = ({ eventRid }: CreateNoteProps) => {
  const router = useRouter();

  return (
    <>
      <NoteEditor onConfirm={(note) => createConfirmed({ ...note, eventRid })} onCancel={() => router.back()} />
    </>
  );
};

export default CreateNote;
