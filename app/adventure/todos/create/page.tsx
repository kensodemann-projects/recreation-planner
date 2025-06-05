import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isLoggedIn } from '@/utils/supabase/auth';
import PageHeader from '@/app/ui/page-header';
import CreateTodoCollection from './create-todo-collection';

const CreateTodoCollectionPage = async () => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  return (
    <>
      <PageHeader>Add a New Todo Collection</PageHeader>
      <CreateTodoCollection />
    </>
  );
};

export default CreateTodoCollectionPage;
