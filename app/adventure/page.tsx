import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import PageHeader from '../ui/page-header';
import TitleHeading from '../ui/title-heading';
import Dashboard from './dashboard';
import { addWeeks, endOfWeek, formatISO, startOfWeek } from 'date-fns';
import { fetchUpcomingEvents } from './events/data';

const HomePage = async () => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const startDate = formatISO(startOfWeek(Date.now()), { representation: 'date' });
  const endDate = formatISO(addWeeks(endOfWeek(Date.now()), 3), { representation: 'date' });
  const events = await fetchUpcomingEvents(startDate, endDate);

  return (
    <>
      <PageHeader>
        <TitleHeading>Dashboard</TitleHeading>
      </PageHeader>
      <Dashboard currentEvents={events} />
    </>
  );
};

export default HomePage;
