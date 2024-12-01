import { Event } from '@/models';
import EventsList from './events-list';
import EventsTable from './events-table';
import SectionHeading from '@/app/ui/section-heading';

interface EventsProperties {
  upcomingEvents: Array<Event>;
}

const Events = ({ upcomingEvents }: EventsProperties) => {
  return (
    <>
      <section>
        <SectionHeading>Upcoming Trips &amp; Events</SectionHeading>
        <EventsTable className="hidden md:table" upcomingEvents={upcomingEvents} />
        <EventsList className="block md:hidden" upcomingEvents={upcomingEvents} />
      </section>
      <div className="mt-2">
        When this area is complete, you will be able to do the following for each event / trip:
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
