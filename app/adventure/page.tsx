import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { addWeeks, endOfWeek, formatISO, startOfWeek } from 'date-fns';
import PageHeader from '../ui/page-header';
import TitleHeading from '../ui/title-heading';
import Dashboard from './dashboard';
import { fetchLatestEvents, fetchUpcomingEvents } from './events/data';
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
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const { currentEvents, latestEvents, todoCollections } = await getHomePageData();

  return (
    <>
      <PageHeader>
        <TitleHeading>Dashboard</TitleHeading>
      </PageHeader>
      <Dashboard currentEvents={currentEvents} latestEvents={latestEvents} dueTodoCollections={todoCollections} />
    </>
  );
};

export default HomePage;
