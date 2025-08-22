import { canDeleteNote, fetchNote } from '@/app/adventure/notes/data';
import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import DeleteNote from './delete-note';

const DeleteNotePage = async (props: { params: Promise<{ id: string; noteId: string }> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const note = await fetchNote(+params.noteId);

  if (!note) {
    return <div>Failed to fetch the note</div>;
  }

  const canDelete = await canDeleteNote(note);

  return (
    <>
      <PageHeader>
        <TitleHeading>Remove Note</TitleHeading>
      </PageHeader>
      <DeleteNote placeId={+params.id} note={note} canDelete={canDelete} />
    </>
  );
};

export default DeleteNotePage;
