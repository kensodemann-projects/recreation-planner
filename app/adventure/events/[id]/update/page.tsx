import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isLoggedIn } from '@/utils/supabase/auth';
import { fetchEvent, fetchEventTypes, fetchPlaces } from '../../data';
import PageHeader from '@/app/ui/page-header';
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
      <PageHeader>Update the Event / Trip</PageHeader>
      <UpdateEvent event={event} types={eventTypes} places={places} />
    </>
  );
};

export default UpdateEventPage;
