import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { fetchEquipment, fetchEquipmentEventTypes, fetchUsageUnits } from '../../../data';
import CreateEquipmentEvent from './create-equipment-event';

const CreateTodoCollectionForEventPage = async (props: { params: Promise<{ id: string }> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const equipment = await fetchEquipment(+params.id);
  const equipmentEventTypes = await fetchEquipmentEventTypes();
  const usageUnits = await fetchUsageUnits();

  return (
    <>
      <PageHeader>
        <TitleHeading>Add a New Maintenance Event</TitleHeading>
        <SubtitleHeading>For: {equipment?.name || ''}</SubtitleHeading>
      </PageHeader>
      <CreateEquipmentEvent
        equipmentRid={equipment!.id!}
        equipmentEventTypes={equipmentEventTypes}
        usageUnits={usageUnits}
      />
    </>
  );
};

export default CreateTodoCollectionForEventPage;
