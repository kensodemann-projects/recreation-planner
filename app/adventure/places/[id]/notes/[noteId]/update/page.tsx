import { fetchNote } from '@/app/adventure/notes/data';
import { fetchPlace } from '@/app/adventure/places/data';
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

  const place = await fetchPlace(note.placeRid!);

  return (
    <>
      <PageHeader>
        <TitleHeading>Update Note</TitleHeading>
        <SubtitleHeading>For Place: {place?.name || ''}</SubtitleHeading>
      </PageHeader>
      <UpdateNote note={note} />
    </>
  );
};

export default UpdateNotePage;
