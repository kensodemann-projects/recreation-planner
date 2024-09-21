import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { createClient } from '@/utils/supabase/server';
import Activities from './activities';

const EventsPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <Activities /> : <MustBeLoggedIn />;
};

export default EventsPage;
