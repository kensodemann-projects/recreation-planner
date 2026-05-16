import SectionHeader from '@/app/ui/section-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { Event } from '@/models';
import EventCard from './ui/event-card';

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
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
            {upcomingEvents.map((x) => (
              <EventCard event={x} key={x.id} callingPage="Events" />
            ))}
          </div>
        </section>
      ) : undefined}
      {priorEvents.length ? (
        <section>
          <SectionHeader>
            <SubtitleHeading>Prior Trips &amp; Events</SubtitleHeading>
          </SectionHeader>
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
            {priorEvents.map((x) => (
              <EventCard event={x} key={x.id} callingPage="Events" />
            ))}
          </div>
        </section>
      ) : undefined}
    </>
  );
};

export default Events;
