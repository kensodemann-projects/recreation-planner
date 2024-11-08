import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isLoggedIn } from '@/utils/supabase/auth';
import { fetchPlaceTypes } from '../data';
import CreatePlace from './create-place';
import PageHeader from '@/app/ui/page-header';

const CreatePlacePage = async () => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const placeTypes = await fetchPlaceTypes();
  return (
    <>
      <PageHeader>Add a New Place</PageHeader>
      <CreatePlace types={placeTypes} />
    </>
  );
};

export default CreatePlacePage;
