import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isLoggedIn } from '@/utils/supabase/auth';
import { fetchEvent, fetchEventTypes, fetchPlaces } from '../../data';
import UpdateEvent from './update-event';

const UpdateEventPage = async (props: { params: Promise<{ id: string }> }) => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const event = await fetchEvent(+params.id);
  const eventTypes = await fetchEventTypes();
  const places = await fetchPlaces();

  if (!event) {
    return <div>Failed to fetch the event</div>;
  }

  return (
    <>
      <PageHeader>
        <TitleHeading>Update the Trip / Event</TitleHeading>
      </PageHeader>
      <UpdateEvent event={event} types={eventTypes} places={places} />
    </>
  );
};

export default UpdateEventPage;
