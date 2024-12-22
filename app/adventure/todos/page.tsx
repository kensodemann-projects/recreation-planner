import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isLoggedIn } from '@/utils/supabase/auth';
import Todos from './todos';
import PageHeader from '@/app/ui/page-header';
import { fetchOpenTodoCollections } from './data';

const EventsPage = async () => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const collections = await fetchOpenTodoCollections();

  return (
    <>
      <PageHeader>Todos</PageHeader>
      <Todos collections={collections} />
    </>
  );
};

export default EventsPage;
