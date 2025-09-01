import { Note } from '@/models';
import NoteCard from './note-card';

export interface NotesProps {
  notes: Note[];
  baseHref: string;
}

const Notes = ({ baseHref, notes }: NotesProps) => {
  return (
    <section className="md:px-2">
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
        {notes.map((x) => (
          <NoteCard baseHref={baseHref} note={x} key={x.id} />
        ))}
      </div>
    </section>
  );
};

export default Notes;
