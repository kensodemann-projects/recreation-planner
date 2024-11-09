import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isLoggedIn } from '@/utils/supabase/auth';
import { fetchEventTypes, fetchPlaces } from '../data';
import PageHeader from '@/app/ui/page-header';
import CreateEvent from './create-event';

const CreateEventPage = async () => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const eventTypes = await fetchEventTypes();
  const places = await fetchPlaces();
  return (
    <>
      <PageHeader>Add a New Event / Trip</PageHeader>
      <CreateEvent types={eventTypes} places={places} />
    </>
  );
};

export default CreateEventPage;
