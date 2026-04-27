import PageHeader from '@/app/ui/page-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import TitleHeading from '@/app/ui/title-heading';
import { fetchEquipment } from '../../../data';
import CreateNote from './create-note';

const CreateNoteForEquipmentPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const equipment = await fetchEquipment(+params.id);

  if (!equipment) {
    return <div>Failed to fetch the equipment</div>;
  }

  return (
    <>
      <PageHeader>
        <TitleHeading>Add a New Note</TitleHeading>
        <SubtitleHeading>For Equipment: {equipment.name || ''}</SubtitleHeading>
      </PageHeader>
      <CreateNote equipmentRid={equipment.id!} />
    </>
  );
};

export default CreateNoteForEquipmentPage;
