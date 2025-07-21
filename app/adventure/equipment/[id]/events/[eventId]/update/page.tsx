import { fetchEquipmentEvent, fetchEquipmentEventTypes, fetchUsageUnits } from '@/app/adventure/equipment/data';
import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import UpdateEquipmentEvent from './update-equipment-event';
import SubtitleHeading from '@/app/ui/subtitle-heading';

type RouteParams = {
  id: string;
  eventId: string;
};

const UpdateEquipmentEventPage = async (props: { params: Promise<RouteParams> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const event = await fetchEquipmentEvent(+params.eventId);

  if (!event) {
    return <div>Failed to fetch the maintenance event</div>;
  }

  const eventTypes = await fetchEquipmentEventTypes();
  const usageUnits = await fetchUsageUnits();

  return (
    <>
      <PageHeader>
        <TitleHeading>Update Maintenance Event</TitleHeading>
        <SubtitleHeading>For: {event.equipment.name || ''}</SubtitleHeading>
      </PageHeader>
      <UpdateEquipmentEvent equipmentEvent={event} equipmentEventTypes={eventTypes} usageUnits={usageUnits} />
    </>
  );
};

export default UpdateEquipmentEventPage;
