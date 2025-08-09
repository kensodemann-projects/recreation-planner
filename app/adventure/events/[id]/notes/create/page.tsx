import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { fetchEvent } from '../../../data';
import CreateNote from './create-note';

const CreateNoteForEventPage = async (props: { params: Promise<{ id: string }> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const event = await fetchEvent(+params.id);

  if (!event) {
    return <div>Failed to fetch the event</div>;
  }

  return (
    <>
      <PageHeader>
        <TitleHeading>Add a New Note</TitleHeading>
        <SubtitleHeading>For Trip / Event: {event.name || ''}</SubtitleHeading>
      </PageHeader>
      <CreateNote eventRid={event.id!} />
    </>
  );
};

export default CreateNoteForEventPage;
