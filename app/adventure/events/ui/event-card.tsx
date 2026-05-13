import { Event } from '@/models';
import { formatDateRange } from '@/utils/formatters';

export interface EventCardProps {
  event: Event;
  callingPage?: string;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="card card-border bg-base-100">
      <div className="card-body">
        <h3 className="card-title">
          {formatDateRange(event.beginDate, event.beginTime, event.endDate, event.endTime)}
        </h3>
        <h4 className="card-sub-title">{event.name}</h4>
        <p>{event.type.name}</p>
        <p>{event.place.name}</p>
      </div>
    </div>
  );
};

export default EventCard;
