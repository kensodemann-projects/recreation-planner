import {
  fetchEquipment,
  fetchMaintenanceItem,
  fetchMaintenanceTypes,
  fetchUsageUnits,
} from '@/app/adventure/equipment/data';
import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import UpdateMaintenanceItem from './update-maintenance-item';
import SubtitleHeading from '@/app/ui/subtitle-heading';

type RouteParams = {
  id: string;
  maintenanceItemId: string;
};

const UpdateMaintenanceItemPage = async (props: { params: Promise<RouteParams> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const maintenaceItem = await fetchMaintenanceItem(+params.maintenanceItemId);

  if (!maintenaceItem) {
    return <div>Failed to fetch the maintenance event</div>;
  }

  const eventTypes = await fetchMaintenanceTypes();
  const usageUnits = await fetchUsageUnits();
  const equipment = await fetchEquipment(maintenaceItem.equipmentRid);

  return (
    <>
      <PageHeader>
        <TitleHeading>Update Maintenance Event</TitleHeading>
        <SubtitleHeading>For: {equipment?.name || ''}</SubtitleHeading>
      </PageHeader>
      <UpdateMaintenanceItem maintenanceItem={maintenaceItem} maintenanceTypes={eventTypes} usageUnits={usageUnits} />
    </>
  );
};

export default UpdateMaintenanceItemPage;
