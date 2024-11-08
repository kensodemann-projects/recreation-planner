import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isLoggedIn } from '@/utils/supabase/auth';
import { fetchPlace, fetchPlaceTypes } from '../../data';
import UpdatePlace from './update-place';
import PageHeader from '@/app/ui/page-header';

const CreatePlacePage = async (props: { params: Promise<{ id: string }> }) => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const place = await fetchPlace(+params.id);
  const placeTypes = await fetchPlaceTypes();

  return (
    <>
      <PageHeader>Update the Place</PageHeader>
      <UpdatePlace place={place!} types={placeTypes} />
    </>
  );
};

export default CreatePlacePage;
