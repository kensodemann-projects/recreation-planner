import { createClient } from '@/utils/supabase/server';
import MustBeLoggedIn from '../ui/must-be-logged-in';
import UpcomingAdventures from './upcoming-adventures';

const HomePage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <UpcomingAdventures /> : <MustBeLoggedIn />;
};

export default HomePage;
