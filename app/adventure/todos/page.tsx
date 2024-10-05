import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isLoggedIn } from '@/utils/supabase/auth';
import Todos from './todos';

const EventsPage = async () => {
  return (await isLoggedIn()) ? <Todos /> : <MustBeLoggedIn />;
};

export default EventsPage;
