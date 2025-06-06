import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import { isLoggedIn } from '@/utils/supabase/auth';
import { fetchTodoCollection } from '../../data';
import UpdateTodoCollection from './update-todo-collection';

const UpdateTodoCollectionPage = async (props: { params: Promise<{ id: string }> }) => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const todoCollection = await fetchTodoCollection(+params.id);

  if (!todoCollection) {
    return <div>Failed to fetch the todo collection</div>;
  }

  return (
    <>
      <PageHeader>Update the Todo Collection</PageHeader>
      <UpdateTodoCollection todoCollection={todoCollection!} />
    </>
  );
};

export default UpdateTodoCollectionPage;
