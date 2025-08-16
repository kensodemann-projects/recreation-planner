'use client';

import NoteEditor from '@/app/adventure/notes/ui/note-editor';
import { useRouter } from 'next/navigation';
import { createConfirmed } from './actions';

type CreateNoteProps = {
  equipmentRid: number | null;
};

const CreateNote = ({ equipmentRid }: CreateNoteProps) => {
  const router = useRouter();

  return (
    <>
      <NoteEditor onConfirm={(note) => createConfirmed({ ...note, equipmentRid })} onCancel={() => router.back()} />
    </>
  );
};

export default CreateNote;
