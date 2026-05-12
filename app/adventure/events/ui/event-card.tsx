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
        <h3 className="card-title">{event.name}</h3>
        <h4 className="card-sub-title">
          {formatDateRange(event.beginDate, event.beginTime, event.endDate, event.endTime)}
        </h4>
      </div>
    </div>
  );
};

export default EventCard;
