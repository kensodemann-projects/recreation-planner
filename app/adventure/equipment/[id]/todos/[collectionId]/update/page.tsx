import { fetchTodoCollection } from '@/app/adventure/todos/data';
import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import UpdateTodoCollection from './update-todo-collection';

const UpdateTodoCollectionPage = async (props: { params: Promise<{ id: string; collectionId: string }> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const todoCollection = await fetchTodoCollection(+params.collectionId);

  if (!todoCollection) {
    return <div>Failed to fetch the todo collection</div>;
  }

  return (
    <>
      <PageHeader>
        <TitleHeading>Update the Todo Collection</TitleHeading>
      </PageHeader>
      <UpdateTodoCollection todoCollection={todoCollection!} />
    </>
  );
};

export default UpdateTodoCollectionPage;
