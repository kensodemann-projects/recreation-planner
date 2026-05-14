import { Event } from '@/models';
import { formatDateRange } from '@/utils/formatters';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export interface EventCardProps {
  event: Event;
  callingPage?: string;
}

const EventCard = ({ event, callingPage }: EventCardProps) => {
  const searchParams = callingPage ? `?callingPage=${callingPage}` : '';

  return (
    <div className="card card-border bg-base-100">
      <div className="card-body">
        <h3 className="card-title">
          {formatDateRange(event.beginDate, event.beginTime, event.endDate, event.endTime)}
        </h3>
        <h4 className="card-sub-title">
          <Link href={`/adventure/events/${event.id}${searchParams}`}>{event.name}</Link>
        </h4>
        <p>{event.type.name}</p>
        <p>{event.place.name}</p>

        <div className="card-actions justify-end items-center mt-6">
          <Link href={`/adventure/events/${event.id}/delete${searchParams}`}>
            <button className="btn btn-error btn-outline btn-circle" aria-label="Delete the event">
              <TrashIcon className="w-6" />
            </button>
          </Link>
          <Link href={`/adventure/events/${event.id}/update${searchParams}`}>
            <button className="btn btn-secondary btn-outline btn-circle" aria-label="Edit the event">
              <PencilSquareIcon className="w-6" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
