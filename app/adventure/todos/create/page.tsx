import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import CreateTodoCollection from './create-todo-collection';

const CreateTodoCollectionPage = async () => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  return (
    <>
      <PageHeader>
        <TitleHeading> Add a New Todo Collection </TitleHeading>
      </PageHeader>
      <CreateTodoCollection />
    </>
  );
};

export default CreateTodoCollectionPage;
