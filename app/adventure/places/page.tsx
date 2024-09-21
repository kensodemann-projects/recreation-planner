import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import { createClient } from '@/utils/supabase/server';

const PlacesPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <PageHeader>Places</PageHeader> : <MustBeLoggedIn />;
};

export default PlacesPage;
