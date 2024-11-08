import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import Place from './place';
import { isLoggedIn } from '@/utils/supabase/auth';
import { fetchPlace } from '../data';

const PlacePage = async (props: { params: Promise<{ id: string }> }) => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const place = await fetchPlace(+params.id);
  return place && <Place place={place} />;
};

export default PlacePage;
