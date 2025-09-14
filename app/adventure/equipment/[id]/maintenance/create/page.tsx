import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { fetchEquipment, fetchMaintenanceTypes, fetchUsageUnits } from '../../../data';
import CreateMaintenanceItem from './create-maintenance-item';

const CreateMaintenanceItemPage = async (props: { params: Promise<{ id: string }> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const equipment = await fetchEquipment(+params.id);

  if (!equipment) {
    return <div>Failed to fetch the equipment</div>;
  }

  const maintenanceTypes = await fetchMaintenanceTypes();
  const usageUnits = await fetchUsageUnits();

  return (
    <>
      <PageHeader>
        <TitleHeading>Add a New Maintenance Event</TitleHeading>
        <SubtitleHeading>For: {equipment.name || ''}</SubtitleHeading>
      </PageHeader>
      <CreateMaintenanceItem equipment={equipment!} maintenanceTypes={maintenanceTypes} usageUnits={usageUnits} />
    </>
  );
};

export default CreateMaintenanceItemPage;
