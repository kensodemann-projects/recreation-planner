import { Note } from '@/models';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export interface NotesProps {
  notes: Note[];
  baseHref: string;
}

const Notes = ({ baseHref, notes }: NotesProps) => {
  return (
    <ul className="list">
      {notes.map((note) => (
        <li className="list-row" key={note.id}>
          <div className="font-bold text-lg list-col-grow">{note.name}</div>
          {note.description && <p className="list-col-wrap whitespace-pre-line text-sm">{note.description}</p>}
          <Link href={`${baseHref}/${note.id}/delete`}>
            <button className="btn btn-error btn-outline btn-circle" aria-label="Edit the collection">
              <TrashIcon className="w-6" />
            </button>
          </Link>
          <Link href={`${baseHref}/${note.id}/update`}>
            <button className="btn btn-secondary btn-outline btn-circle" aria-label="Edit the collection">
              <PencilSquareIcon className="w-6" />
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Notes;
