import { fetchEquipment } from '@/app/adventure/equipment/data';
import { fetchNote } from '@/app/adventure/notes/data';
import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import UpdateNote from './update-note';

type RouteParams = {
  id: string;
  noteId: string;
};

const UpdateNotePage = async (props: { params: Promise<RouteParams> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const note = await fetchNote(+params.noteId);

  if (!note) {
    return <div>Failed to fetch the note</div>;
  }

  const equipment = await fetchEquipment(note.equipmentRid!);

  return (
    <>
      <PageHeader>
        <TitleHeading>Update Note</TitleHeading>
        <SubtitleHeading>For Equipment: {equipment?.name || ''}</SubtitleHeading>
      </PageHeader>
      <UpdateNote note={note} />
    </>
  );
};

export default UpdateNotePage;
