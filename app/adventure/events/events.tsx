import { Event } from '@/models';
import EventsList from './events-list';
import EventsTable from './events-table';

interface EventsProperties {
  events: Array<Event>;
}

const Events = ({ events }: EventsProperties) => {
  return (
    <>
      <EventsTable className="hidden md:table" events={events} />
      <EventsList className="block md:hidden" events={events} />
      <div className="mt-2">
        For each activity, you will be able to:
        <ul className="list-disc list-inside">
          <li className="list-item">Create and view notes (lists, etc)</li>
          <li className="list-item">Create Todos</li>
          <li className="list-item">Packing List</li>
          <li className="list-item">Shopping List</li>
          <li className="list-item">List of sites to see</li>
          <li className="list-item">Schedule</li>
        </ul>
      </div>
    </>
  );
};

export default Events;
