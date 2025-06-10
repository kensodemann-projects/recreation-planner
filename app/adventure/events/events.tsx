import SectionHeader from '@/app/ui/section-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { Event } from '@/models';
import EventsList from './events-list';
import EventsTable from './events-table';

interface EventsProperties {
  priorEvents: Array<Event>;
  upcomingEvents: Array<Event>;
}

const Events = ({ priorEvents, upcomingEvents }: EventsProperties) => {
  return (
    <>
      {upcomingEvents.length ? (
        <section>
          <SectionHeader>
            <SubtitleHeading>Upcoming Trips &amp; Events</SubtitleHeading>
          </SectionHeader>
          <EventsTable className="hidden md:table" events={upcomingEvents} />
          <EventsList className="block md:hidden" events={upcomingEvents} />
        </section>
      ) : undefined}
      {priorEvents.length ? (
        <section>
          <SectionHeader>
            <SubtitleHeading>Prior Trips &amp; Events</SubtitleHeading>
          </SectionHeader>
          <EventsTable className="hidden md:table" events={priorEvents} />
          <EventsList className="block md:hidden" events={priorEvents} />
        </section>
      ) : undefined}
    </>
  );
};

export default Events;
