import { Event } from '@/models';
import { formatDateRange } from '@/utils/formatters';

const EventsTable = ({ className, events }: { className?: string | undefined; events: Array<Event> }) => {
  return (
    <table className={`table table-zebra ${className || ''}`}>
      <thead>
        <tr>
          <th>Dates</th>
          <th>Name</th>
          <th>Location</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id}>
            <th>{formatDateRange(event.beginDate, event.beginTime, event.endDate, event.endTime)}</th>
            <td>{event.name}</td>
            <td>{event.place.name}</td>
            <td>{event.type.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventsTable;
