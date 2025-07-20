import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { fetchEquipment, fetchEquipmentTypes } from '../../data';
import UpdateEquipment from './update-equipment';

const UpdateEquipmentPage = async (props: { params: Promise<{ id: string }> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const equipment = await fetchEquipment(+params.id);
  const equipmentTypes = await fetchEquipmentTypes();

  if (!equipment) {
    return <div>Failed to fetch the equipment</div>;
  }

  return (
    <>
      <PageHeader>
        <TitleHeading>Update the Equipment</TitleHeading>
      </PageHeader>
      <UpdateEquipment equipment={equipment} equipmentTypes={equipmentTypes} />
    </>
  );
};

export default UpdateEquipmentPage;
