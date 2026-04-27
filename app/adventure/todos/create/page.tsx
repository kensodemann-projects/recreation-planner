import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import CreateTodoCollection from './create-todo-collection';

const CreateTodoCollectionPage = async () => {
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
