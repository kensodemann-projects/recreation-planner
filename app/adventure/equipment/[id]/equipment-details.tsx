import SectionHeader from '@/app/ui/section-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { Equipment, TodoCollection } from '@/models';
import { formatCurrency, formatDate } from '@/utils/formatters';

interface EquipmentDetailsProps {
  equipment: Equipment;
  todoCollections: TodoCollection[];
}

const labeledFied = (label: string, value: string | null) =>
  value ? (
    <div>
      <span className="label">{label}:</span> {value}
    </div>
  ) : null;

const detailsSection = (equipment: Equipment) => (
  <section className="col-span-3 md:col-span-1">
    <SectionHeader>
      <SubtitleHeading>Details</SubtitleHeading>
    </SectionHeader>
    {labeledFied('Purchase Date', formatDate(equipment.purchaseDate))}
    {labeledFied('Cost', formatCurrency(equipment.cost))}
    {labeledFied('Manufacturer', equipment.manufacturer)}
    {labeledFied('Model', equipment.model)}
  </section>
);

const specificationsSection = (equipment: Equipment) =>
  equipment.weight || equipment.length || equipment.capacity ? (
    <section className="col-span-3 md:col-span-1">
      <SectionHeader>
        <SubtitleHeading>Specifications</SubtitleHeading>
      </SectionHeader>
      {labeledFied('Weight', equipment.weight)}
      {labeledFied('Length', equipment.length)}
      {labeledFied('Capacity', equipment.capacity)}
    </section>
  ) : null;

const insuranceSection = (equipment: Equipment) =>
  equipment.insuranceCarrier ||
  equipment.insurancePolicyNumber ||
  equipment.insuranceContactName ||
  equipment.insuranceContactPhoneNumber ||
  equipment.insuranceContactEmail ? (
    <section className="col-span-3 md:col-span-1">
      <SectionHeader>
        <SubtitleHeading>Insurance Information</SubtitleHeading>
      </SectionHeader>
      {labeledFied('Carrier', equipment.insuranceCarrier)}
      {labeledFied('Policy Number', equipment.insurancePolicyNumber)}
      {labeledFied('Contact', equipment.insuranceContactName)}
      {labeledFied('Phone Number', equipment.insuranceContactPhoneNumber)}
      {labeledFied('Email', equipment.insuranceContactEmail)}
    </section>
  ) : null;

const EquipmentDetails = ({ equipment }: EquipmentDetailsProps) => {
  return (
    <>
      <section>
        <SectionHeader>
          <SubtitleHeading>{equipment.name}</SubtitleHeading>
        </SectionHeader>
        <div className="whitespace-pre-line">{equipment.description}</div>
        {labeledFied('Equipment Type', equipment.equipmentType.name)}
      </section>

      <div className="grid grid-cols-3 gap-x-4">
        {detailsSection(equipment)}
        {specificationsSection(equipment)}
        {insuranceSection(equipment)}
      </div>
    </>
  );
};

export default EquipmentDetails;
