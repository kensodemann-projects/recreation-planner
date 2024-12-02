import EntityDropdownMenu from '@/app/ui/entity-dropdown-menu';
import { formatDateRange } from '@/utils/formatters';
import Link from 'next/link';
import { EventsListProps } from './events-list-props';

const EventsList = ({ className, events }: EventsListProps) => {
  return (
    <ul className={`list-none ${className}`}>
      {events.map((event) => (
        <li key={event.id} className="py-2 border-solid first:border-t border-b border-primary flex">
          <Link className="flex-grow" href={`events/${event.id}`}>
            <div className="font-bold">
              {formatDateRange(event.beginDate, event.beginTime, event.endDate, event.endTime)}
            </div>
            <div>
              {event.type.name}: {event.name}
            </div>
            <div>{event.place.name}</div>
          </Link>
          <div className="self-center">
            <EntityDropdownMenu href={`events/${event.id}`} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EventsList;
