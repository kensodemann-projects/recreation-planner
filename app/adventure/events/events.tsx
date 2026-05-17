import SectionHeader from '@/app/ui/section-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { Event } from '@/models';
import EventCard from './ui/event-card';
import Message from '@/app/ui/message';

interface EventsProperties {
  priorEvents: Array<Event>;
  upcomingEvents: Array<Event>;
  showAllPriorEvents?: boolean;
  showAllUpcomingEvents?: boolean;
}

const Events = ({ priorEvents, upcomingEvents }: EventsProperties) => {
  return (
    <>
      <section>
        <SectionHeader>
          <div className="flex items-center justify-between w-full">
            <SubtitleHeading>Upcoming Trips &amp; Events</SubtitleHeading>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="checkbox checkbox-sm" />
              <span className="text-sm">Show All</span>
            </label>
          </div>
        </SectionHeader>
        {upcomingEvents.length ? (
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
            {upcomingEvents.map((x) => (
              <EventCard event={x} key={x.id} callingPage="Events" />
            ))}
          </div>
        ) : (
          <Message>You have no upcoming events.</Message>
        )}
      </section>
      <section>
        <SectionHeader>
          <div className="flex items-center justify-between w-full">
            <SubtitleHeading>Prior Trips &amp; Events</SubtitleHeading>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="checkbox checkbox-sm" />
              <span className="text-sm">Show All</span>
            </label>
          </div>
        </SectionHeader>
        {priorEvents.length ? (
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
            {priorEvents.map((x) => (
              <EventCard event={x} key={x.id} callingPage="Events" />
            ))}
          </div>
        ) : (
          <Message>You have no prior events.</Message>
        )}
      </section>
    </>
  );
};

export default Events;
