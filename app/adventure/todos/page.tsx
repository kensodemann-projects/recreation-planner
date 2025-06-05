import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isLoggedIn } from '@/utils/supabase/auth';
import Todos from './todos';
import PageHeader from '@/app/ui/page-header';
import { fetchOpenTodoCollections } from './data';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

const EventsPage = async () => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const collections = await fetchOpenTodoCollections();

  return (
    <>
      <PageHeader>Todos</PageHeader>
      <Todos collections={collections} />
      <Link className="fixed bottom-4 right-4" href="/adventure/todos/create">
        <button className="btn btn-primary btn-circle btn-outline">
          <PlusIcon className="w-6" />
        </button>
      </Link>
    </>
  );
};

export default EventsPage;
