import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import CreateNote from './create-note';
import { fetchEquipment } from '../../../data';

const CreateNoteForEventPage = async (props: { params: Promise<{ id: string }> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const equipment = await fetchEquipment(+params.id);

  if (!equipment) {
    return <div>Failed to fetch the event</div>;
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

export default CreateNoteForEventPage;
