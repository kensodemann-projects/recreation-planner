import LabeledField from '@/app/ui/labeled-field';
import SectionHeader from '@/app/ui/section-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { Equipment, EquipmentEvent, TodoCollection } from '@/models';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import EquipmentEventsWrapper from './equipment-events-wrapper';
import Todos from '../../todos/ui/todos';

interface EquipmentDetailsProps {
  equipment: Equipment;
}

const detailsSection = (equipment: Equipment) => (
  <section className="col-span-3 md:col-span-1" data-testid="details-section">
    <SectionHeader>
      <SubtitleHeading>Details</SubtitleHeading>
    </SectionHeader>
    <LabeledField label="Equipment Type">{equipment.equipmentType.name}</LabeledField>
    {equipment.purchaseDate && <LabeledField label="Purchase Date">{formatDate(equipment.purchaseDate)}</LabeledField>}
    {equipment.cost && <LabeledField label="Cost">{formatCurrency(equipment.cost)}</LabeledField>}
    {equipment.manufacturer && <LabeledField label="Manufacturer">{equipment.manufacturer}</LabeledField>}
    {equipment.model && <LabeledField label="Model">{equipment.model}</LabeledField>}
  </section>
);

const specificationsSection = (equipment: Equipment) =>
  (equipment.weight || equipment.length || equipment.capacity) && (
    <section className="col-span-3 md:col-span-1" data-testid="specifications-section">
      <SectionHeader>
        <SubtitleHeading>Specifications</SubtitleHeading>
      </SectionHeader>
      {equipment.weight && <LabeledField label="Weight">{equipment.weight}</LabeledField>}
      {equipment.length && <LabeledField label="Length">{equipment.length}</LabeledField>}
      {equipment.capacity && <LabeledField label="Capacity">{equipment.capacity}</LabeledField>}
    </section>
  );

const insuranceSection = (equipment: Equipment) =>
  (equipment.insuranceCarrier ||
    equipment.insurancePolicyNumber ||
    equipment.insuranceContactName ||
    equipment.insuranceContactPhoneNumber ||
    equipment.insuranceContactEmail) && (
    <section className="col-span-3 md:col-span-1" data-testid="insurance-section">
      <SectionHeader>
        <SubtitleHeading>Insurance Information</SubtitleHeading>
      </SectionHeader>
      {equipment.insuranceCarrier && <LabeledField label="Carrier">{equipment.insuranceCarrier}</LabeledField>}
      {equipment.insurancePolicyNumber && (
        <LabeledField label="Policy Number">{equipment.insurancePolicyNumber}</LabeledField>
      )}
      {equipment.insuranceContactName && <LabeledField label="Contact">{equipment.insuranceContactName}</LabeledField>}
      {equipment.insuranceContactPhoneNumber && (
        <LabeledField label="Phone Number">{equipment.insuranceContactPhoneNumber}</LabeledField>
      )}
      {equipment.insuranceContactEmail && <LabeledField label="Email">{equipment.insuranceContactEmail}</LabeledField>}
    </section>
  );

const EquipmentDetails = ({ equipment }: EquipmentDetailsProps) => {
  return (
    <>
      <section>
        <SectionHeader>
          <SubtitleHeading>{equipment.name}</SubtitleHeading>
        </SectionHeader>
        <div className="whitespace-pre-line">{equipment.description}</div>
      </section>

      <div className="grid grid-cols-3 gap-x-4">
        {detailsSection(equipment)}
        {specificationsSection(equipment)}
        {insuranceSection(equipment)}
      </div>

      <section data-testid="maintenance-events-section">
        <SectionHeader>
          <SubtitleHeading>Maintenance Events</SubtitleHeading>
        </SectionHeader>

        <EquipmentEventsWrapper equipmentEvents={equipment.equipmentEvents!} />

        <Link href={`${equipment.id}/events/create`}>
          <button className="btn btn-primary">
            <PlusCircleIcon className="w-6" />
            Add Event
          </button>
        </Link>
      </section>

      <section data-testid="todos-section">
        <SectionHeader>
          <SubtitleHeading>Todos</SubtitleHeading>
        </SectionHeader>
        <Todos collections={equipment.todoCollections!} baseHref={`/adventure/equipment/${equipment.id}/todos`} />
        <Link href={`${equipment.id}/todos/create`}>
          <button className="btn btn-primary">
            <PlusCircleIcon className="w-6" />
            Add Todo Collection
          </button>
        </Link>
      </section>
    </>
  );
};

export default EquipmentDetails;
