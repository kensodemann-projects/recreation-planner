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
    </>
  );
};

export default Events;
