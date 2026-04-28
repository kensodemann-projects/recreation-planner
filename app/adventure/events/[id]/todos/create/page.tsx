import PageHeader from '@/app/ui/page-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import TitleHeading from '@/app/ui/title-heading';
import { fetchEvent } from '../../../data';
import CreateTodoCollection from './create-todo-collection';

const CreateTodoCollectionForEventPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const event = await fetchEvent(+params.id);

  if (!event) {
    return <div>Failed to fetch the event</div>;
  }

  return (
    <>
      <PageHeader>
        <TitleHeading>Add a New Todo Collection</TitleHeading>
        <SubtitleHeading>For Trip / Event: {event.name || ''}</SubtitleHeading>
      </PageHeader>
      <CreateTodoCollection eventRid={event.id!} />
    </>
  );
};

export default CreateTodoCollectionForEventPage;
