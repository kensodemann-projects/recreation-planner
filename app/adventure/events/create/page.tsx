import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { fetchEventTypes, fetchPlaces } from '../data';
import CreateEvent from './create-event';

const CreateEventPage = async () => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const eventTypes = await fetchEventTypes();
  const places = await fetchPlaces();

  return (
    <>
      <PageHeader>
        <TitleHeading>Add a New Trip / Event</TitleHeading>
      </PageHeader>
      <CreateEvent types={eventTypes} places={[...places, { id: -1, name: 'Create a new place...' }]} />
    </>
  );
};

export default CreateEventPage;
