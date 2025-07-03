import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { fetchEquipment } from '../../data';
import UpdateEquipment from './update-equipment';

const UpdatePlacePage = async (props: { params: Promise<{ id: string }> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const equipment = await fetchEquipment(+params.id);

  if (!equipment) {
    return <div>Failed to fetch the equipment</div>;
  }

  return (
    <>
      <PageHeader>
        <TitleHeading>Update the Equipment</TitleHeading>
      </PageHeader>
      <UpdateEquipment equipment={equipment} />
    </>
  );
};

export default UpdatePlacePage;
