import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isLoggedIn } from '@/utils/supabase/auth';
import Reservations from './reservations';

const ReservationsPage = async () => {
  return (await isLoggedIn()) ? <Reservations /> : <MustBeLoggedIn />;
};

export default ReservationsPage;
