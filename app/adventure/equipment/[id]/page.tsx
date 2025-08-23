import BackButton from '@/app/ui/back-button';
import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { fetchEquipment } from '../data';
import EquipmentDetails from './equipment-details';

const EquipmentPage = async (props: { params: Promise<{ id: string }> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const id = +params.id;
  const equipment = await fetchEquipment(id, true);

  if (!equipment) {
    return <div>Failed to fetch the equipment</div>;
  }

  return (
    <>
      <PageHeader>
        <TitleHeading>Equipment Details</TitleHeading>
      </PageHeader>

      <EquipmentDetails equipment={equipment} />

      <BackButton defaultHref="/adventure/equipment" />
    </>
  );
};

export default EquipmentPage;
