'use client';

import { Note } from '@/models';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export interface NoteCardProps {
  baseHref: string;
  note: Note;
}

const NoteCard = ({ baseHref, note }: NoteCardProps) => {
  return (
    <div className="card card-border bg-base-100">
      <div className="card-body">
        <h3 className="card-title">{note.name}</h3>
        <p className="grow whitespace-pre-line">{note.description}</p>
        <div className="card-actions justify-end items-center mt-6">
          <Link
            className="btn btn-error btn-outline btn-circle"
            href={`${baseHref}/${note.id}/delete`}
            aria-label="Delete the note"
          >
            <TrashIcon className="w-6" />
          </Link>
          <Link
            className="btn btn-secondary btn-outline btn-circle"
            href={`${baseHref}/${note.id}/update`}
            aria-label="Edit the note"
          >
            <PencilSquareIcon className="w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
