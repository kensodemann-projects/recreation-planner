import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { createClient } from '@/utils/supabase/server';
import Places from './places';
import { fetchPlaces } from './data';

const PlacesPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <MustBeLoggedIn />;
  }

  const places = await fetchPlaces();
  return <Places places={places} />;
};

export default PlacesPage;
