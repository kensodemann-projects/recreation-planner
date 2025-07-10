import EntityDropdownMenu from '@/app/ui/entity-dropdown-menu';
import { formatCurrency, formatDate } from '@/utils/formatters';
import Link from 'next/link';
import { EquipmentListProps } from './equipment-list-props';

const EquipmentList = ({ className, equipment }: EquipmentListProps) => {
  return (
    <ul className={`list-none ${className}`}>
      {equipment.map((current) => (
        <li key={current.id} className="py-2 border-solid first:border-t border-b border-primary flex">
          <Link className="grow" href={`equipment/${current.id}`}>
            <div className="font-bold">{current.name}</div>
            {current.purchaseDate && (
              <div>
                <span className="label">Purchase Date:</span> {formatDate(current.purchaseDate)}
              </div>
            )}
            {(current.cost || current.cost === 0) && (
              <div>
                <span className="label">Cost:</span> {formatCurrency(current.cost)}
              </div>
            )}
          </Link>
          <div className="self-center">
            <EntityDropdownMenu href={`equipment/${current.id}`} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EquipmentList;
