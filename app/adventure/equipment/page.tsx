import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import { isLoggedIn } from '@/utils/supabase/auth';
import Equipment from './equipment';

const EquipmentPage = async () => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  return (
    <>
      <PageHeader>Equipment</PageHeader>
      <Equipment />
    </>
  );
};

export default EquipmentPage;
