import BackButton from '@/app/ui/back-button';
import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { fetchEvent } from '../data';
import EventDetails from './event-details';

const EventPage = async (props: { params: Promise<{ id: string }> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const id = +params.id;
  const event = await fetchEvent(id, true);

  if (!event) {
    return <div>Failed to fetch the event</div>;
  }

  return (
    <>
      <PageHeader>
        <TitleHeading>Trip / Event Details</TitleHeading>
      </PageHeader>

      <EventDetails event={event} />

      <BackButton defaultHref="/adventure/events" />
    </>
  );
};

export default EventPage;
