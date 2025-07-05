import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import CreateEquipment from './create-equipment';
import { fetchEquipmentTypes } from '../data';

const CreateEquipmentPage = async () => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const equipmentTypes = await fetchEquipmentTypes();

  return (
    <>
      <PageHeader>
        <TitleHeading>Add a New Piece of Equipment</TitleHeading>
      </PageHeader>
      <CreateEquipment equipmentTypes={equipmentTypes} />
    </>
  );
};

export default CreateEquipmentPage;
