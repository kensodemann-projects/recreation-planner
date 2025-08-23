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
          <EventsTable className="hidden md:table" events={upcomingEvents} callingPage="Events" />
          <EventsList className="block md:hidden" events={upcomingEvents} callingPage="Events" />
        </section>
      ) : undefined}
      {priorEvents.length ? (
        <section>
          <SectionHeader>
            <SubtitleHeading>Prior Trips &amp; Events</SubtitleHeading>
          </SectionHeader>
          <EventsTable className="hidden md:table" events={priorEvents} callingPage="Events" />
          <EventsList className="block md:hidden" events={priorEvents} callingPage="Events" />
        </section>
      ) : undefined}
    </>
  );
};

export default Events;
