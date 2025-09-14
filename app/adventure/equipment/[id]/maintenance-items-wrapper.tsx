import MaintenanceItemsList from './maintenance-items-list';
import { MaintenanceItemsListProps } from './maintenance-items-list-props';
import MaintenanceItemsTable from './maintenance-items-table';

const MaintenanceItemsWrapper = ({ maintenanceItems }: MaintenanceItemsListProps) => {
  return (
    <>
      <MaintenanceItemsTable className="hidden md:table w-full" maintenanceItems={maintenanceItems} />
      <MaintenanceItemsList className="block md:hidden" maintenanceItems={maintenanceItems} />
    </>
  );
};

export default MaintenanceItemsWrapper;
