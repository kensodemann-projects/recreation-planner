'use client';

import { Equipment } from '@/models';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Notes from '../../notes/ui/notes';
import Todos from '../../todos/ui/todos';
import EquipmentEventsWrapper from './equipment-events-wrapper';
import { useSearchParams } from 'next/navigation';

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
        <Link href={`${equipment.id}/todos/create`}>
          <button className="btn btn-primary mt-5">
            <PlusCircleIcon className="w-6" />
            Add Todo Collection
          </button>
        </Link>
      </section>

      <input
        type="radio"
        name="equipment-tabs"
        className="tab"
        aria-label="Maintenance"
        defaultChecked={activeTab === 'Maintenance'}
      />
      <section className="tab-content" data-testid="maintenance-events-section">
        <EquipmentEventsWrapper equipmentEvents={equipment.equipmentEvents!} />
        <Link href={`${equipment.id}/events/create`}>
          <button className="btn btn-primary mt-5">
            <PlusCircleIcon className="w-6" />
            Add Event
          </button>
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

        <Link href={`${equipment.id}/notes/create`}>
          <button className="btn btn-primary mt-5">
            <PlusCircleIcon className="w-6" />
            Add Note
          </button>
        </Link>
      </section>
    </div>
  );
};

export default EquipmentDetailsTabs;
