import { Event } from '@/models';

export interface EventCardProps {
  event: Event;
  callingPage?: string;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="card card-border bg-base-100">
      <div className="card-body">
        <h3 className="card-title">{event.name}</h3>
      </div>
    </div>
  );
};

export default EventCard;
