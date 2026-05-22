import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { fetchTodoCollections } from './data';
import Todos from './ui/todos';

const TodosPage = async () => {
  const collections = await fetchTodoCollections();

  return (
    <>
      <PageHeader>
        <TitleHeading>Todos</TitleHeading>
      </PageHeader>
      <Todos collections={collections} baseHref="/adventure/todos" />
      <Link className="fixed bottom-4 right-4 btn btn-primary btn-circle" href="/adventure/todos/create">
        <PlusIcon className="w-6" />
      </Link>
    </>
  );
};

export default TodosPage;
