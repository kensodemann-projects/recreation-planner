import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isLoggedIn } from '@/utils/supabase/auth';
import Todos from './todos';
import PageHeader from '@/app/ui/page-header';

const EventsPage = async () => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  return (
    <>
      <PageHeader>Todos</PageHeader>
      <Todos />
    </>
  );
};

export default EventsPage;
