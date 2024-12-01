import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import { isLoggedIn } from '@/utils/supabase/auth';
import Events from './events';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import { fetchUpcomingEvents, fetchEvents } from './data';
import { formatISO, startOfWeek } from 'date-fns';

const EventsPage = async () => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const dt = formatISO(startOfWeek(Date.now()), { representation: 'date' });
  const upcomingEvents = await fetchUpcomingEvents(dt);

  return (
    <>
      <PageHeader>Trips &amp; Events</PageHeader>
      <Events upcomingEvents={upcomingEvents} />
      <Link className="fixed bottom-4 right-4" href="/adventure/events/create">
        <button className="btn btn-secondary btn-circle btn-outline">
          <PlusIcon className="w-6" />
        </button>
      </Link>
    </>
  );
};

export default EventsPage;
