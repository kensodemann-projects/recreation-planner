import SectionHeader from '@/app/ui/section-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { Equipment, TodoCollection } from '@/models';
import { formatCurrency, formatDate } from '@/utils/formatters';

interface EquipmentDetailsProps {
  equipment: Equipment;
  todoCollections: TodoCollection[];
}

const purchaseDate = (dt: string | undefined | null) =>
  dt ? (
    <div>
      <span className="label">Purchase Date:</span> {formatDate(dt)}
    </div>
  ) : null;

const cost = (c: number | undefined | null) =>
  c ? (
    <div>
      <span className="label">Cost:</span> {formatCurrency(c)}
    </div>
  ) : null;

const EquipmentDetails = ({ equipment }: EquipmentDetailsProps) => {
  return (
    <section>
      <SectionHeader>
        <SubtitleHeading>{equipment.name}</SubtitleHeading>
      </SectionHeader>
      <div className="whitespace-pre-line">{equipment.description}</div>
      {purchaseDate(equipment.purchaseDate)}
      {cost(equipment.cost)}
    </section>
  );
};

export default EquipmentDetails;
