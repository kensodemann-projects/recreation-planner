import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isLoggedIn } from '@/utils/supabase/auth';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { fetchEvent, fetchTodoCollectionsForEvent } from '../data';
import EventDetails from './event-details';

const EventPage = async (props: { params: Promise<{ id: string }> }) => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const id = +params.id;
  const event = await fetchEvent(id);

  if (!event) {
    return <div>Failed to fetch the event</div>;
  }

  const todoCollections = (await fetchTodoCollectionsForEvent(id)) || [];

  return (
    <>
      <PageHeader>
        <TitleHeading>Trip / Event Details</TitleHeading>
      </PageHeader>

      <EventDetails event={event} todoCollections={todoCollections} />

      <Link className="fixed top-4 right-4 link-secondary" href={`/adventure/events`}>
        <ArrowUturnLeftIcon className="w-6" />
      </Link>
    </>
  );
};

export default EventPage;
