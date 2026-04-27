import { fetchPlaces } from '@/app/adventure/places/data';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { Place } from '@/models';
import { fetchEventTypes } from '../data';
import CreateEvent from './create-event';

const CreateEventPage = async () => {
  const eventTypes = await fetchEventTypes();
  const places = await fetchPlaces();
  const createNewPlace: Place = {
    id: -1,
    name: 'Create a new place...',
    description: null,
    address: { line1: null, line2: null, city: null, state: null, postal: null },
    type: {
      id: -1,
      name: 'fake',
      description: null,
    },
    phoneNumber: null,
    website: null,
  };

  return (
    <>
      <PageHeader>
        <TitleHeading>Add a New Trip / Event</TitleHeading>
      </PageHeader>
      <CreateEvent types={eventTypes} places={[...places, createNewPlace]} />
    </>
  );
};

export default CreateEventPage;
