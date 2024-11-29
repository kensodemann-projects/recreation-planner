import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import { isLoggedIn } from '@/utils/supabase/auth';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { canDeleteEvent, fetchEvent } from '../../data';
import DeleteEvent from './delete-event';

const RemovePlacePage = async (props: { params: Promise<{ id: string }> }) => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const event = await fetchEvent(+params.id);

  if (!event) {
    return <div>Failed to fetch the place</div>;
  }

  const canDelete = await canDeleteEvent(event);

  return (
    <>
      <PageHeader>Remove Event / Trip</PageHeader>

      <DeleteEvent event={event} canDelete={canDelete} />

      <Link className="fixed top-4 right-4 link-secondary" href={`/adventure/places`}>
        <ArrowUturnLeftIcon className="w-6" />
      </Link>
    </>
  );
};

export default RemovePlacePage;
