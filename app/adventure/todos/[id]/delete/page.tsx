import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { canDeleteTodoCollection, fetchTodoCollection } from '../../data';
import DeleteTodoCollection from './delete-todo-collection';

const DeleteTodoCollectionPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const collection = await fetchTodoCollection(+params.id);

  if (!collection) {
    return <div>Failed to fetch the TODO collection</div>;
  }

  const canDelete = await canDeleteTodoCollection(collection);

  return (
    <>
      <PageHeader>
        <TitleHeading>Remove TODO Collection</TitleHeading>
      </PageHeader>
      <DeleteTodoCollection collection={collection} canDelete={canDelete} />
    </>
  );
};

export default DeleteTodoCollectionPage;
