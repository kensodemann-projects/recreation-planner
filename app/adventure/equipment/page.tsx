import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { createClient } from '@/utils/supabase/server';
import Equipment from './equipment';

const EquipmentPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <Equipment /> : <MustBeLoggedIn />;
};

export default EquipmentPage;
