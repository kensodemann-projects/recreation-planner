import { ItineraryItem } from '@/models';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export interface ItineraryItemsProps {
  items: ItineraryItem[];
  baseHref: string;
}

const ItineraryItems = ({ baseHref, items }: ItineraryItemsProps) => {
  return (
    <ul className="list">
      {items.map((item) => (
        <li className="list-row" key={item.id}>
          <div className="font-bold text-lg list-col-grow">{item.name}</div>
          {item.description && <p className="list-col-wrap whitespace-pre-line text-sm">{item.description}</p>}
          <Link href={`${baseHref}/${item.id}/delete`}>
            <button className="btn btn-error btn-outline btn-circle" aria-label="Edit the collection">
              <TrashIcon className="w-6" />
            </button>
          </Link>
          <Link href={`${baseHref}/${item.id}/update`}>
            <button className="btn btn-secondary btn-outline btn-circle" aria-label="Edit the collection">
              <PencilSquareIcon className="w-6" />
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ItineraryItems;
