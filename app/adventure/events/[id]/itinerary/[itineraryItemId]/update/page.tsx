import { fetchEvent } from '@/app/adventure/events/data';
import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { fetchItineraryItem } from '../../data';
import UpdateItineraryItem from './update-itinerary-item';

type RouteParams = {
  id: string;
  itineraryItemId: string;
};

const UpdateItineraryItemPage = async (props: { params: Promise<RouteParams> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const itineraryItem = await fetchItineraryItem(+params.itineraryItemId);

  if (!itineraryItem) {
    return <div>Failed to fetch the itinerary item</div>;
  }

  const event = await fetchEvent(itineraryItem.eventRid!);

  return (
    <>
      <PageHeader>
        <TitleHeading>Update Itinerary Item</TitleHeading>
        <SubtitleHeading>For Event: {event?.name || ''}</SubtitleHeading>
      </PageHeader>
      <UpdateItineraryItem item={itineraryItem} />
    </>
  );
};

export default UpdateItineraryItemPage;
