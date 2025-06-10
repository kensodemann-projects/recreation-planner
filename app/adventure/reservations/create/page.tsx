import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isLoggedIn } from '@/utils/supabase/auth';
import CreateReservation from './create-reservation';

const CreateReservationPage = async () => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  return (
    <>
      <PageHeader>
        <TitleHeading>Add a New Reservation</TitleHeading>
      </PageHeader>
      <CreateReservation />
    </>
  );
};

export default CreateReservationPage;
