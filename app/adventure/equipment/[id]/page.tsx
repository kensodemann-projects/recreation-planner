import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { fetchEquipment, fetchEquipmentEvents, fetchTodoCollectionsForEquipment } from '../data';
import EquipmentDetails from './equipment-details';

const EquipmentPage = async (props: { params: Promise<{ id: string }> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const id = +params.id;
  const equipment = await fetchEquipment(id);

  if (!equipment) {
    return <div>Failed to fetch the equipment</div>;
  }

  const events = (await fetchEquipmentEvents(id)) || [];
  const todoCollections = (await fetchTodoCollectionsForEquipment(id)) || [];

  return (
    <>
      <PageHeader>
        <TitleHeading>Equipment Details</TitleHeading>
      </PageHeader>

      <EquipmentDetails equipment={equipment} equipmentEvents={events} todoCollections={todoCollections} />

      <Link className="fixed top-4 right-4 link-secondary" href={`/adventure/equipment`}>
        <ArrowUturnLeftIcon className="w-6" />
      </Link>
    </>
  );
};

export default EquipmentPage;
