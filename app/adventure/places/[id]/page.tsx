import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import Place from './place';
import { isLoggedIn } from '@/utils/supabase/auth';
import { fetchPlace } from '../data';

const PlacePage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const place = await fetchPlace(+params.id);
  return place && <Place place={place} />;
};

export default PlacePage;
