import Message from '@/app/ui/message';
import { ItineraryItem } from '@/models';
import { formatDate } from '@/utils/formatters';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export interface ItineraryItemsProps {
  items: ItineraryItem[];
  baseHref: string;
}

const ItineraryItems = ({ baseHref, items }: ItineraryItemsProps) => {
  return items?.length ? (
    <ul className="list">
      {items.map((item) => (
        <li className="list-row" key={item.id}>
          <div className="list-col-grow">
            <div className="font-bold text-lg"> {item.name}</div>
            <div className="font-bold">{formatDate(item.date, item.time)}</div>
          </div>
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
  ) : (
    <Message>You have not defined an itinerary for this event.</Message>
  );
};

export default ItineraryItems;
