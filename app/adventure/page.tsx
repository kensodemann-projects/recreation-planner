import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isLoggedIn } from '@/utils/supabase/auth';
import PageHeader from '../ui/page-header';
import TitleHeading from '../ui/title-heading';
import Dashboard from './dashboard';

const HomePage = async () => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  return (
    <>
      <PageHeader>
        <TitleHeading>Dashboard</TitleHeading>
      </PageHeader>
      <Dashboard />
    </>
  );
};

export default HomePage;
