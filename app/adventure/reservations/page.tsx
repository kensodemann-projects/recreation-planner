import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { createClient } from '@/utils/supabase/server';
import Reservations from './reservations';

const ReservationsPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <Reservations /> : <MustBeLoggedIn />;
};

export default ReservationsPage;
