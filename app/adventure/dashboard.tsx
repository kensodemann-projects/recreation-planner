import SectionHeader from '@/app/ui/section-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { Event } from '@/models';
import EventsTable from '@/app/adventure/events/events-table';
import EventsList from '@/app/adventure/events/events-list';

interface DashboardProps {
  currentEvents: Event[];
}

const Dashboard = ({ currentEvents }: DashboardProps) => {
  return (
    <>
      {currentEvents.length ? (
        <section>
          <SectionHeader>
            <SubtitleHeading>Upcoming Trips &amp; Events</SubtitleHeading>
          </SectionHeader>
          <EventsTable className="hidden md:table" events={currentEvents} />
          <EventsList className="block md:hidden" events={currentEvents} />
        </section>
      ) : undefined}
    </>
  );
};

export default Dashboard;
