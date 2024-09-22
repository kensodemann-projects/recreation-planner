import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { createClient } from '@/utils/supabase/server';
import Todos from './todos';

const EventsPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <Todos /> : <MustBeLoggedIn />;
};

export default EventsPage;
