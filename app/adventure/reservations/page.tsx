import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import { createClient } from '@/utils/supabase/server';

const ReservationsPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <PageHeader>Reservations</PageHeader> : <MustBeLoggedIn />;
};

export default ReservationsPage;
