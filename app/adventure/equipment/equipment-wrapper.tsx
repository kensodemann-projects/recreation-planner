import { Equipment } from '@/models';
import EquipmentTable from './equipment-table';
import EquipmentList from './equipment-list';

const EquipmentWrapper = ({ equipment }: { equipment: Equipment[] }) => {
  return (
    <>
      <EquipmentTable className="hidden md:table" equipment={equipment} />
      <EquipmentList className="block md:hidden" equipment={equipment} />
    </>
  );
};

export default EquipmentWrapper;
