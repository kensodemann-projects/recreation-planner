import { formatCurrency, formatDate, formatNumber } from '@/utils/formatters';
import Link from 'next/link';
import { MaintenanceItemsListProps } from './maintenance-items-list-props';

const MaintenanceItemsList = ({ className, maintenanceItems }: MaintenanceItemsListProps) => {
  return (
    <ul className={`list-none ${className}`}>
      {maintenanceItems.map((current) => (
        <li key={current.id} className="py-2 border-solid first:border-t border-b border-primary flex">
          <Link className="grow" href={`${current.equipmentRid}/maintenance/${current.id}/update`}>
            <div className="font-bold">{current.name}</div>
            <div>
              <span className="label">Date:</span> {formatDate(current.date)}
            </div>
            {(current.cost || current.cost === 0) && (
              <div>
                <span className="label">Cost:</span> {formatCurrency(current.cost)}
              </div>
            )}
            {(current.usage || current.usage === 0) && (
              <div>
                <span className="label">Usage:</span> {formatNumber(current.usage)} {current.usageUnits?.name}
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MaintenanceItemsList;
