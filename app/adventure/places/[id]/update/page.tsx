import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { fetchPlace, fetchPlaceTypes } from '../../data';
import UpdatePlace from './update-place';

const UpdatePlacePage = async (props: { params: Promise<{ id: string }> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const place = await fetchPlace(+params.id);
  const placeTypes = await fetchPlaceTypes();

  if (!place) {
    return <div>Failed to fetch the place</div>;
  }

  return (
    <>
      <PageHeader>
        <TitleHeading>Update the Place</TitleHeading>
      </PageHeader>
      <UpdatePlace place={place} types={placeTypes} />
    </>
  );
};

export default UpdatePlacePage;
