import { Event } from '@/models';
import EventsList from './events-list';
import EventsTable from './events-table';
import SectionHeading from '@/app/ui/section-heading';

interface EventsProperties {
  priorEvents: Array<Event>;
  upcomingEvents: Array<Event>;
}

const Events = ({ priorEvents, upcomingEvents }: EventsProperties) => {
  return (
    <>
      {upcomingEvents.length ? (
        <section>
          <SectionHeading>Upcoming Trips &amp; Events</SectionHeading>
          <EventsTable className="hidden md:table" events={upcomingEvents} />
          <EventsList className="block md:hidden" events={upcomingEvents} />
        </section>
      ) : undefined}
      {priorEvents.length ? (
        <section>
          <SectionHeading>Prior Trips &amp; Events</SectionHeading>
          <EventsTable className="hidden md:table" events={priorEvents} />
          <EventsList className="block md:hidden" events={priorEvents} />
        </section>
      ) : undefined}
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
