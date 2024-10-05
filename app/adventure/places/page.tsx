import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isLoggedIn } from '@/utils/supabase/auth';
import { fetchPlaces } from './data';
import Places from './places';

const PlacesPage = async () => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const places = await fetchPlaces();
  return <Places places={places} />;
};

export default PlacesPage;
