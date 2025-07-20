import EquipmentTable from './equipment-events-table';
import EquipmentEventsList from './equipment-events-list';
import { EquipmentEventsListProps } from './equipment-events-list-props';

const EquipmentEventsWrapper = ({ equipmentEvents }: EquipmentEventsListProps) => {
  return (
    <>
      <EquipmentTable className="hidden md:table w-full" equipmentEvents={equipmentEvents} />
      <EquipmentEventsList className="block md:hidden" equipmentEvents={equipmentEvents} />
    </>
  );
};

export default EquipmentEventsWrapper;
