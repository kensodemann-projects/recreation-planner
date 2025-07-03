import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { canDeleteEquipment, fetchEquipment } from '../../data';
import DeleteEquipment from './delete-equipment';

const RemoveEquipmentPage = async (props: { params: Promise<{ id: string }> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const equipment = await fetchEquipment(+params.id);

  if (!equipment) {
    return <div>Failed to fetch the equipment</div>;
  }

  const canDelete = await canDeleteEquipment(equipment);

  return (
    <>
      <PageHeader>
        <TitleHeading>Remove Equipment</TitleHeading>
      </PageHeader>
      <DeleteEquipment equipment={equipment} canDelete={canDelete} />
    </>
  );
};

export default RemoveEquipmentPage;
