import { addWeeks, formatISO } from 'date-fns';
import PageHeader from '../ui/page-header';
import TitleHeading from '../ui/title-heading';
import Dashboard from './dashboard';
import { fetchPriorEvents, fetchUpcomingEvents } from './events/data';
import { fetchDueTodoCollections } from './todos/data';
import { Event } from '@/models';

const dateToString = (dt: Date) => formatISO(dt, { representation: 'date' });

const firstThreeEvents = (events: Event[]) => events.slice(0, Math.min(3, events.length));
const filterCurrentEvents = (events: Event[], dt: string) => events.filter((e) => e.beginDate <= dt);

const getHomePageData = async () => {
  const now = new Date();

  const allEvents = await fetchUpcomingEvents(dateToString(now));
  const pastEvents = await fetchPriorEvents(dateToString(now), dateToString(addWeeks(now, -1)));
  const todoCollections = await fetchDueTodoCollections(dateToString(addWeeks(now, 1)));

  let currentEvents = filterCurrentEvents(allEvents, dateToString(addWeeks(now, 2)));
  if (currentEvents.length < 3) {
    currentEvents = firstThreeEvents(allEvents);
  }

  return { currentEvents, pastEvents, todoCollections };
};

const HomePage = async () => {
  const { currentEvents, pastEvents, todoCollections } = await getHomePageData();

  return (
    <>
      <PageHeader>
        <TitleHeading>Dashboard</TitleHeading>
      </PageHeader>
      <Dashboard currentEvents={currentEvents} recentPastEvents={pastEvents} dueTodoCollections={todoCollections} />
    </>
  );
};

export default HomePage;
