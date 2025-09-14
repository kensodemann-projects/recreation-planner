import { formatCurrency, formatDate, formatNumber } from '@/utils/formatters';
import Link from 'next/link';
import { MaintenanceItemsListProps } from './maintenance-items-list-props';

const MaintenanceItemsTable = ({ className, maintenanceItems }: MaintenanceItemsListProps) => {
  return (
    <table className={`table-zebra ${className || ''}`}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Type</th>
          <th>Usage</th>
          <th>Units</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        {maintenanceItems.map((current) => (
          <tr key={current.id}>
            <th>
              <Link href={`${current.equipmentRid}/maintenance/${current.id}/update`}>{current.name}</Link>
            </th>
            <td>{current.date && formatDate(current.date)}</td>
            <td>{current.maintenanceType.name}</td>
            <td className="text-right">{(current.usage || current.usage === 0) && formatNumber(current.usage)}</td>
            <td>{current.usageUnits?.name}</td>
            <td className="text-right">{(current.cost || current.cost === 0) && formatCurrency(current.cost)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MaintenanceItemsTable;
