import SectionHeader from '@/app/ui/section-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { Event, TodoCollection } from '@/models';
import EventsTable from '@/app/adventure/events/events-table';
import EventsList from '@/app/adventure/events/events-list';
import Todos from './todos/ui/todos';
import Message from '../ui/message';

interface DashboardProps {
  currentEvents: Event[];
  latestEvents: Event[];
  dueTodoCollections: TodoCollection[];
}

const Dashboard = ({ currentEvents, dueTodoCollections, latestEvents }: DashboardProps) => {
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
          <Message>You have no upcoming events.</Message>
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
          <Message>You have no events.</Message>
        )}
      </section>

      <section>
        <SectionHeader>
          <SubtitleHeading>Due TODOs</SubtitleHeading>
        </SectionHeader>
        {dueTodoCollections.length ? (
          <Todos
            collections={dueTodoCollections!}
            baseHref={`/adventure/todos`}
            callingPage="Home"
            disableArchived={true}
          />
        ) : (
          <Message>You have no TODOs due at this time.</Message>
        )}
      </section>
    </>
  );
};

export default Dashboard;
