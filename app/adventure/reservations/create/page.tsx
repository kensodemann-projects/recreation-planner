import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import { isLoggedIn } from '@/utils/supabase/auth';
import PageHeader from '@/app/ui/page-header';
import CreateReservation from './create-reservation';

const CreateReservationPage = async () => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  return (
    <>
      <PageHeader>Add a New Reservation</PageHeader>
      <CreateReservation />
    </>
  );
};

export default CreateReservationPage;
