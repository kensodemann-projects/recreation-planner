import SectionHeader from '@/app/ui/section-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { Event, TodoCollection } from '@/models';
import Message from '../ui/message';
import EventCard from './events/ui/event-card';
import Todos from './todos/ui/todos';

interface DashboardProps {
  currentEvents: Event[];
  recentPastEvents: Event[];
  dueTodoCollections: TodoCollection[];
}

const Dashboard = ({ currentEvents, dueTodoCollections, recentPastEvents }: DashboardProps) => {
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

      {recentPastEvents.length ? (
        <section>
          <SectionHeader>
            <SubtitleHeading>Recent Past Events</SubtitleHeading>
          </SectionHeader>
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
            {recentPastEvents.map((x) => (
              <EventCard event={x} key={x.id} callingPage="Home" />
            ))}
          </div>
        </section>
      ) : null}

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
