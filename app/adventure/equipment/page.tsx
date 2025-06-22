import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isLoggedIn } from '@/utils/supabase/auth';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { fetchAllEquipment } from './data';
import EquipmentWrapper from './equipment-wrapper';

const EquipmentPage = async () => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const equipment = await fetchAllEquipment();

  return (
    <>
      <PageHeader>
        <TitleHeading>Equipment</TitleHeading>
      </PageHeader>
      <EquipmentWrapper equipment={equipment} />
      <Link className="fixed bottom-4 right-4" href="/adventure/equipment/create">
        <button className="btn btn-primary btn-circle btn-outline">
          <PlusIcon className="w-6" />
        </button>
      </Link>
    </>
  );
};

export default EquipmentPage;
