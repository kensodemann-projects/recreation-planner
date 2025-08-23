import SectionHeader from '@/app/ui/section-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { Event } from '@/models';
import EventsTable from '@/app/adventure/events/events-table';
import EventsList from '@/app/adventure/events/events-list';

interface DashboardProps {
  currentEvents: Event[];
  latestEvents: Event[];
}

const Dashboard = ({ currentEvents, latestEvents }: DashboardProps) => {
  return (
    <>
      <section>
        <SectionHeader>
          <SubtitleHeading>Upcoming Events</SubtitleHeading>
        </SectionHeader>
        {currentEvents.length ? (
          <>
            <EventsTable className="hidden md:table" events={currentEvents} callingPage="Home" />
            <EventsList className="block md:hidden" events={currentEvents} callingPage="Home" />
          </>
        ) : (
          <div>You have no upcoming events.</div>
        )}
      </section>

      <section>
        <SectionHeader>
          <SubtitleHeading>Most Recent Events</SubtitleHeading>
        </SectionHeader>
        {latestEvents.length ? (
          <>
            <EventsTable className="hidden md:table" events={latestEvents} callingPage="Home" />
            <EventsList className="block md:hidden" events={latestEvents} callingPage="Home" />
          </>
        ) : (
          <div>You have no events.</div>
        )}
      </section>
    </>
  );
};

export default Dashboard;
