import { Event } from '@/models';
import { formatDateRange } from '@/utils/formatters';
import Link from 'next/link';

const EventsList = ({ className, events }: { className: string; events: Array<Event> }) => {
  return (
    <ul className={`list-none ${className}`}>
      {events.map((event) => (
        <li key={event.id} className="py-2 border-solid first:border-t border-b border-primary">
          <Link href={`events/${event.id}`}>
            <div className="font-bold">
              {formatDateRange(event.beginDate, event.beginTime, event.endDate, event.endTime)}
            </div>
            <div>
              {event.type.name}: {event.name}
            </div>
            <div>{event.place.name}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default EventsList;
