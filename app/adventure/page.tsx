import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import PageHeader from '../ui/page-header';
import TitleHeading from '../ui/title-heading';
import Dashboard from './dashboard';
import { addWeeks, endOfWeek, formatISO, startOfWeek } from 'date-fns';
import { fetchLatestEvents, fetchUpcomingEvents } from './events/data';

const HomePage = async () => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const startDate = formatISO(startOfWeek(Date.now()), { representation: 'date' });
  const endDate = formatISO(addWeeks(endOfWeek(Date.now()), 3), { representation: 'date' });
  const currentEvents = await fetchUpcomingEvents(startDate, endDate);
  const latestEvents = await fetchLatestEvents(3);

  return (
    <>
      <PageHeader>
        <TitleHeading>Dashboard</TitleHeading>
      </PageHeader>
      <Dashboard currentEvents={currentEvents} latestEvents={latestEvents} />
    </>
  );
};

export default HomePage;
