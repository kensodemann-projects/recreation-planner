import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Reservations from './reservations';

const ReservationsPage = async () => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  return (
    <>
      <PageHeader>
        <TitleHeading>Reservations</TitleHeading>
      </PageHeader>
      <Reservations />
      <Link className="fixed bottom-4 right-4" href="/adventure/reservations/create">
        <button className="btn btn-primary btn-circle btn-outline">
          <PlusIcon className="w-6" />
        </button>
      </Link>
    </>
  );
};

export default ReservationsPage;
