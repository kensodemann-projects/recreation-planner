import EntityDropdownMenu from '@/app/ui/entity-dropdown-menu';
import { formatCurrency, formatDate, formatNumber } from '@/utils/formatters';
import Link from 'next/link';
import { EquipmentEventsListProps } from './equipment-events-list-props';

const EquipmentList = ({ className, equipmentEvents }: EquipmentEventsListProps) => {
  return (
    <ul className={`list-none ${className}`}>
      {equipmentEvents.map((current) => (
        <li key={current.id} className="py-2 border-solid first:border-t border-b border-primary flex">
          <Link className="grow" href={`${current.equipment.id}/events/${current.id}/update`}>
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

export default EquipmentList;
