import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { canDeleteItineraryItem, fetchItineraryItem } from '../../data';
import DeleteNote from './delete-note';

const DeleteItineraryItemPage = async (props: { params: Promise<{ id: string; itineraryItemId: string }> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const item = await fetchItineraryItem(+params.itineraryItemId);

  if (!item) {
    return <div>Failed to fetch the itinerary item</div>;
  }

  const canDelete = await canDeleteItineraryItem(item);

  return (
    <>
      <PageHeader>
        <TitleHeading>Remove Itinerary Item</TitleHeading>
      </PageHeader>
      <DeleteNote eventId={+params.id} item={item} canDelete={canDelete} />
    </>
  );
};

export default DeleteItineraryItemPage;
