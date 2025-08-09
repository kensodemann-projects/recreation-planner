import { Note } from '@/models';

export interface NotesProps {
  notes: Note[];
}

const Notes = ({ notes }: NotesProps) => {
  return (
    <ul className="list">
      {notes.map((note) => (
        <li className="list-row" key={note.id}>
          <div className="font-bold text-lg">{note.name}</div>
          {note.description && <p className="list-col-wrap text-sm">{note.description}</p>}
        </li>
      ))}
    </ul>
  );
};

export default Notes;
