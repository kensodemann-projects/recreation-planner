import EntityDropdownMenu from '@/app/ui/entity-dropdown-menu';
import { formatCurrency, formatDate } from '@/utils/formatters';
import Link from 'next/link';
import { EquipmentListProps } from './equipment-list-props';

const EquipmentTable = ({ className, equipment }: EquipmentListProps) => {
  return (
    <table className={`table-zebra ${className || ''}`}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Purchase Date</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        {equipment.map((current) => (
          <tr key={current.id}>
            <th>
              <Link href={`equipment/${current.id}`}>{current.name}</Link>
            </th>
            <td>{current.purchaseDate && formatDate(current.purchaseDate)}</td>
            <td>{(current.cost || current.cost === 0) && formatCurrency(current.cost)}</td>
            <td>
              <EntityDropdownMenu href={`equipment/${current.id}`} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EquipmentTable;
