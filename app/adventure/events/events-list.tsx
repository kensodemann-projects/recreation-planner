import { Event } from '@/models';
import { formatDateRange } from '@/utils/formatters';

const EventsList = ({ className, events }: { className: string; events: Array<Event> }) => {
  return (
    <ul className={`list-none ${className}`}>
      {events.map((event) => (
        <li key={event.id} className="py-2 border-solid first:border-t border-b border-primary">
          <div className="font-bold">
            {formatDateRange(event.beginDate, event.beginTime, event.endDate, event.endTime)}
          </div>
          <div>
            {event.type.name}: {event.name}
          </div>
          <div>{event.place.name}</div>
        </li>
      ))}
    </ul>
  );
};

export default EventsList;
