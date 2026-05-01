import { addWeeks, endOfWeek, formatISO, startOfWeek } from 'date-fns';
import Dashboard from './dashboard';
import { fetchLatestEvents, fetchUpcomingEvents } from './events/data';
import Title from './title';
import { fetchDueTodoCollections } from './todos/data';

const dateToString = (dt: Date) => formatISO(dt, { representation: 'date' });

const getHomePageData = async () => {
  const now = Date.now();
  const weekStartDate = startOfWeek(now);
  const weekEndDate = endOfWeek(now);

  const currentEvents = await fetchUpcomingEvents(dateToString(weekStartDate), dateToString(addWeeks(weekEndDate, 3)));
  const latestEvents = await fetchLatestEvents(3);
  const todoCollections = await fetchDueTodoCollections(dateToString(weekEndDate));

  return { currentEvents, latestEvents, todoCollections };
};

const HomePage = async () => {
  const { currentEvents, latestEvents, todoCollections } = await getHomePageData();

  return (
    <>
      <Title />
      <Dashboard currentEvents={currentEvents} latestEvents={latestEvents} dueTodoCollections={todoCollections} />
    </>
  );
};

export default HomePage;
