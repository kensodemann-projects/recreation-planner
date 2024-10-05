import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isLoggedIn } from '@/utils/supabase/auth';
import Dashboard from './dashboard';

const HomePage = async () => {
  return (await isLoggedIn()) ? <Dashboard /> : <MustBeLoggedIn />;
};

export default HomePage;
