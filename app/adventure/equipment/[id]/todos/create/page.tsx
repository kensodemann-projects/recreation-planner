import PageHeader from '@/app/ui/page-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import TitleHeading from '@/app/ui/title-heading';
import { fetchEquipment } from '../../../data';
import CreateTodoCollection from './create-todo-collection';

const CreateTodoCollectionForEquipmentPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const equipment = await fetchEquipment(+params.id);

  if (!equipment) {
    return <div>Failed to fetch the equipment</div>;
  }

  return (
    <>
      <PageHeader>
        <TitleHeading>Add a New Todo Collection</TitleHeading>
        <SubtitleHeading>For Equipment: {equipment.name || ''}</SubtitleHeading>
      </PageHeader>
      <CreateTodoCollection equipmentRid={equipment.id!} />
    </>
  );
};

export default CreateTodoCollectionForEquipmentPage;
