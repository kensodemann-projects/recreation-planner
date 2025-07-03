import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { fetchEvent } from '../../../data';
import CreateTodoCollection from './create-todo-collection';

const CreateTodoCollectionForEventPage = async (props: { params: Promise<{ id: string }> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const event = await fetchEvent(+params.id);

  return (
    <>
      <PageHeader>
        <TitleHeading>Add a New Todo Collection</TitleHeading>
        <SubtitleHeading>For Trip / Event: {event?.name || ''}</SubtitleHeading>
      </PageHeader>
      <CreateTodoCollection eventRid={event?.id} />
    </>
  );
};

export default CreateTodoCollectionForEventPage;
