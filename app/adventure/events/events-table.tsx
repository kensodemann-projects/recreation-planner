import EntityDropdownMenu from '@/app/ui/entity-dropdown-menu';
import { formatDateRange } from '@/utils/formatters';
import Link from 'next/link';
import { EventsListProps } from './events-list-props';

const EventsTable = ({ callingPage, className, events }: EventsListProps) => {
  return (
    <table className={`table-zebra ${className || ''}`}>
      <thead>
        <tr>
          <th>Dates</th>
          <th>Name</th>
          <th>Location</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id}>
            <th>
              <Link href={`/adventure/events/${event.id}?callingPage=${callingPage}`}>
                {formatDateRange(event.beginDate, event.beginTime, event.endDate, event.endTime)}
              </Link>
            </th>
            <td>
              <Link href={`/adventure/events/${event.id}?callingPage=${callingPage}`}>{event.name}</Link>
            </td>
            <td>{event.place.name}</td>
            <td>{event.type.name}</td>
            <td>
              <EntityDropdownMenu href={`/adventure/events/${event.id}`} callingPage={callingPage} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventsTable;
