import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { fetchEvent } from '../../../data';
import CreateItineraryItem from './create-itinerary-item';

const CreateItineraryItemPage = async (props: { params: Promise<{ id: string }> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const event = await fetchEvent(+params.id);

  if (!event) {
    return <div>Failed to fetch the event</div>;
  }

  return (
    <>
      <PageHeader>
        <TitleHeading>Add a New Itinerary Item</TitleHeading>
        <SubtitleHeading>For Trip / Event: {event.name || ''}</SubtitleHeading>
      </PageHeader>
      <CreateItineraryItem eventRid={event.id!} />
    </>
  );
};

export default CreateItineraryItemPage;
