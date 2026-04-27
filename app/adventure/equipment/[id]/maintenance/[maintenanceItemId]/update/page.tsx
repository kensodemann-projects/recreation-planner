import {
  fetchEquipment,
  fetchMaintenanceItem,
  fetchMaintenanceTypes,
  fetchUsageUnits,
} from '@/app/adventure/equipment/data';
import PageHeader from '@/app/ui/page-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import TitleHeading from '@/app/ui/title-heading';
import UpdateMaintenanceItem from './update-maintenance-item';

type RouteParams = {
  id: string;
  maintenanceItemId: string;
};

const UpdateMaintenanceItemPage = async (props: { params: Promise<RouteParams> }) => {
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
