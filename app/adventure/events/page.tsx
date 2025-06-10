import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isLoggedIn } from '@/utils/supabase/auth';
import { PlusIcon } from '@heroicons/react/24/outline';
import { formatISO, startOfWeek } from 'date-fns';
import Link from 'next/link';
import { fetchPriorEvents, fetchUpcomingEvents } from './data';
import Events from './events';

const EventsPage = async () => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const dt = formatISO(startOfWeek(Date.now()), { representation: 'date' });
  const upcomingEvents = await fetchUpcomingEvents(dt);
  const priorEvents = await fetchPriorEvents(dt);

  return (
    <>
      <PageHeader>
        <TitleHeading>Trips &amp; Events</TitleHeading>
      </PageHeader>
      <Events priorEvents={priorEvents} upcomingEvents={upcomingEvents} />
      <Link className="fixed bottom-4 right-4" href="/adventure/events/create">
        <button className="btn btn-primary btn-circle btn-outline">
          <PlusIcon className="w-6" />
        </button>
      </Link>
    </>
  );
};

export default EventsPage;
