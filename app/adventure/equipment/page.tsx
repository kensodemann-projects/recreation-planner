import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isLoggedIn } from '@/utils/supabase/auth';
import Equipment from './equipment';

const EquipmentPage = async () => {
  return (await isLoggedIn()) ? <Equipment /> : <MustBeLoggedIn />;
};

export default EquipmentPage;
