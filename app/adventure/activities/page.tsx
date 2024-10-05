import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isLoggedIn } from '@/utils/supabase/auth';
import Activities from './activities';

const EventsPage = async () => {
  return (await isLoggedIn()) ? <Activities /> : <MustBeLoggedIn />;
};

export default EventsPage;
