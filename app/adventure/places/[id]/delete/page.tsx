import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import { isLoggedIn } from '@/utils/supabase/auth';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { canDeletePlace, fetchPlace } from '../../data';
import ConfirmDelete from '@/app/ui/confirm-delete';
import DeletePlace from './delete-place';

const RemovePlacePage = async (props: { params: Promise<{ id: string }> }) => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const place = await fetchPlace(+params.id);

  if (!place) {
    return <div>Failed to fetch the place</div>;
  }

  const canDelete = await canDeletePlace(place);

  return (
    <>
      <PageHeader>Remove Place</PageHeader>

      <DeletePlace place={place} canDelete={canDelete} />

      <Link className="fixed top-4 right-4 link-secondary" href={`/adventure/places`}>
        <ArrowUturnLeftIcon className="w-6" />
      </Link>
    </>
  );
};

export default RemovePlacePage;
