import SectionHeader from '@/app/ui/section-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { Event } from '@/models';
import EventCard from './ui/event-card';
import ShowAllToggle from './ui/show-all-toggle';
import Message from '@/app/ui/message';

interface EventsProperties {
  priorEvents: Array<Event>;
  upcomingEvents: Array<Event>;
  showAllPriorEvents?: boolean;
  showAllUpcomingEvents?: boolean;
  onShowAllPriorEventsChange?: (showAll: boolean) => void;
  onShowAllUpcomingEventsChange?: (showAll: boolean) => void;
}

const Events = ({
  priorEvents,
  upcomingEvents,
  showAllPriorEvents,
  showAllUpcomingEvents,
  onShowAllPriorEventsChange,
  onShowAllUpcomingEventsChange,
}: EventsProperties) => {
  return (
    <>
      <section>
        <SectionHeader>
          <div className="flex items-center justify-between w-full">
            <SubtitleHeading>Upcoming Trips &amp; Events</SubtitleHeading>
            <ShowAllToggle checked={showAllUpcomingEvents} onChange={onShowAllUpcomingEventsChange} />
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
            <ShowAllToggle checked={showAllPriorEvents} onChange={onShowAllPriorEventsChange} />
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
