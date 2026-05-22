'use client';

import { Equipment } from '@/models';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Notes from '../../notes/ui/notes';
import Todos from '../../todos/ui/todos';
import MaintenanceItemsWrapper from './maintenance-items-wrapper';

interface EquipmentDetailsTabsProps {
  equipment: Equipment;
}

const EquipmentDetailsTabs = ({ equipment }: EquipmentDetailsTabsProps) => {
  const sp = useSearchParams();
  const activeTab = sp?.get('lastActivity') || 'Todos';
  return (
    <div className="tabs tabs-border mt-5">
      <input
        type="radio"
        name="equipment-tabs"
        className="tab"
        aria-label="Todos"
        defaultChecked={activeTab === 'Todos'}
      />
      <section className="tab-content" data-testid="todos-section">
        <Todos collections={equipment.todoCollections!} baseHref={`/adventure/equipment/${equipment.id}/todos`} />
        <Link
          className="btn btn-primary mt-5"
          href={`/adventure/equipment/${equipment.id}/todos/create`}
          aria-label="Add Todo Collection"
        >
          <PlusCircleIcon className="w-6" />
          Add Todo Collection
        </Link>
      </section>

      <input
        type="radio"
        name="equipment-tabs"
        className="tab"
        aria-label="Maintenance"
        defaultChecked={activeTab === 'Maintenance'}
      />
      <section className="tab-content" data-testid="maintenance-items-section">
        <MaintenanceItemsWrapper maintenanceItems={equipment.maintenanceItems!} />
        <Link
          className="btn btn-primary mt-5"
          href={`/adventure/equipment/${equipment.id}/maintenance/create`}
          aria-label="Add Maintenance Item"
        >
          <PlusCircleIcon className="w-6" />
          Add Maintenance Item
        </Link>
      </section>

      <input
        type="radio"
        name="equipment-tabs"
        className="tab"
        aria-label="Notes"
        defaultChecked={activeTab === 'Notes'}
      />
      <section className="tab-content">
        <Notes notes={equipment.notes || []} baseHref={`/adventure/equipment/${equipment.id}/notes`} />

        <Link
          className="btn btn-primary mt-5"
          href={`/adventure/equipment/${equipment.id}/notes/create`}
          aria-label="Add Note"
        >
          <PlusCircleIcon className="w-6" />
          Add Note
        </Link>
      </section>
    </div>
  );
};

export default EquipmentDetailsTabs;
