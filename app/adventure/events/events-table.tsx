import EntityDropdownMenu from '@/app/ui/entity-dropdown-menu';
import { Event } from '@/models';
import { formatDateRange } from '@/utils/formatters';
import Link from 'next/link';

const EventsTable = ({ className, events }: { className?: string | undefined; events: Array<Event> }) => {
  return (
    <table className={`table table-zebra ${className || ''}`}>
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
            <th>{formatDateRange(event.beginDate, event.beginTime, event.endDate, event.endTime)}</th>
            <td>
              <Link href={`events/${event.id}`}>{event.name}</Link>
            </td>
            <td>{event.place.name}</td>
            <td>{event.type.name}</td>
            <td>
              <EntityDropdownMenu href={`events/${event.id}`} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventsTable;
