import { createClient } from '@/utils/supabase/server';
import MustBeLoggedIn from '../ui/must-be-logged-in';
import Dashboard from './dashboard';

const HomePage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <Dashboard /> : <MustBeLoggedIn />;
};

export default HomePage;
