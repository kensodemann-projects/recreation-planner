import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import CreateTodoCollection from './create-todo-collection';
import { fetchEquipment } from '../../../data';

const CreateTodoCollectionForEquipmentPage = async (props: { params: Promise<{ id: string }> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

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
