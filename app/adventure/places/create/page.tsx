import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isLoggedIn } from '@/utils/supabase/auth';
import { fetchPlaceTypes } from '../data';
import CreatePlace from './create-place';

const CreatePlacePage = async () => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const placeTypes = await fetchPlaceTypes();
  return <CreatePlace types={placeTypes} />;
};

export default CreatePlacePage;
