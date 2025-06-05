import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import { isLoggedIn } from '@/utils/supabase/auth';
import CreateEquipment from './create-equipment';

const CreateEquipmentPage = async () => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  return (
    <>
      <PageHeader>Add a New Piece of Equipment</PageHeader>
      <CreateEquipment />
    </>
  );
};

export default CreateEquipmentPage;
