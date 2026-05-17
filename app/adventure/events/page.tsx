import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { PlusIcon } from '@heroicons/react/24/outline';
import { addMonths, formatISO, startOfWeek } from 'date-fns';
import Link from 'next/link';
import { fetchPriorEvents, fetchUpcomingEvents } from './data';
import Events from './events';
import { cookies } from 'next/headers';

const getEventsPageData = async () => {
  const cookieStore = await cookies();
  const showAllUpcomingEvents = cookieStore.get('show-all-upcoming-events')?.value === 'true';
  const showAllPriorEvents = cookieStore.get('show-all-prior-events')?.value === 'true';

  const dt = formatISO(startOfWeek(Date.now()), { representation: 'date' });
  const endDate = formatISO(addMonths(startOfWeek(Date.now()), 3), { representation: 'date' });
  const afterDate = formatISO(addMonths(startOfWeek(Date.now()), -1), { representation: 'date' });

  const upcomingEvents = await (showAllUpcomingEvents ? fetchUpcomingEvents(dt) : fetchUpcomingEvents(dt, endDate));
  const priorEvents = await (showAllPriorEvents ? fetchPriorEvents(dt) : fetchPriorEvents(dt, afterDate));
  return { upcomingEvents, priorEvents, showAllPriorEvents, showAllUpcomingEvents };
};

const EventsPage = async () => {
  const { upcomingEvents, priorEvents, showAllUpcomingEvents, showAllPriorEvents } = await getEventsPageData();

  return (
    <>
      <PageHeader>
        <TitleHeading>Trips &amp; Events</TitleHeading>
      </PageHeader>
      <Events
        priorEvents={priorEvents}
        upcomingEvents={upcomingEvents}
        showAllUpcomingEvents={showAllUpcomingEvents}
        showAllPriorEvents={showAllPriorEvents}
      />
      <Link className="fixed bottom-4 right-4" href="/adventure/events/create">
        <button className="btn btn-primary btn-circle btn-outline">
          <PlusIcon className="w-6" />
        </button>
      </Link>
    </>
  );
};

export default EventsPage;
