'use client';

import { Note } from '@/models';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export interface TodoCollectionCardProps {
  baseHref: string;
  note: Note;
}

const TodoCollectionCard = ({ baseHref, note }: TodoCollectionCardProps) => {
  return (
    <div className="card card-border bg-base-100">
      <div className="card-body">
        <h3 className="card-title">{note.name}</h3>
        <p className="grow whitespace-pre-line">{note.description}</p>
        <div className="card-actions justify-end items-center mt-6">
          <Link href={`${baseHref}/${note.id}/delete`}>
            <button className="btn btn-error btn-outline btn-circle" aria-label="Delete the note">
              <TrashIcon className="w-6" />
            </button>
          </Link>
          <Link href={`${baseHref}/${note.id}/update`}>
            <button className="btn btn-secondary btn-outline btn-circle" aria-label="Edit the note">
              <PencilSquareIcon className="w-6" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TodoCollectionCard;
