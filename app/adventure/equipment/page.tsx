import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import { isLoggedIn } from '@/utils/supabase/auth';
import Equipment from './equipment';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

const EquipmentPage = async () => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  return (
    <>
      <PageHeader>Equipment</PageHeader>
      <Equipment />
      <Link className="fixed bottom-4 right-4" href="/adventure/equipment/create">
        <button className="btn btn-primary btn-circle btn-outline">
          <PlusIcon className="w-6" />
        </button>
      </Link>
    </>
  );
};

export default EquipmentPage;
