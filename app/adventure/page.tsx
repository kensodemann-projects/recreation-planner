import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isLoggedIn } from '@/utils/supabase/auth';
import PageHeader from '../ui/page-header';
import Dashboard from './dashboard';

const HomePage = async () => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  return (
    <>
      <PageHeader>Dashboard</PageHeader>
      <Dashboard />
    </>
  );
};

export default HomePage;
