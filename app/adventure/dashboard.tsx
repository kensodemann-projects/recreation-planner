import SectionHeader from '@/app/ui/section-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { Event, TodoCollection } from '@/models';
import Message from '../ui/message';
import EventCard from './events/ui/event-card';
import Todos from './todos/ui/todos';

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
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
            {currentEvents.map((x) => (
              <EventCard event={x} key={x.id} callingPage="Home" />
            ))}
          </div>
        ) : (
          <Message>You have no upcoming events.</Message>
        )}
      </section>

      <section>
        <SectionHeader>
          <SubtitleHeading>Most Recent Events</SubtitleHeading>
        </SectionHeader>
        {latestEvents.length ? (
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
            {latestEvents.map((x) => (
              <EventCard event={x} key={x.id} callingPage="Home" />
            ))}
          </div>
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
