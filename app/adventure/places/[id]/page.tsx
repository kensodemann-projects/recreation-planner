import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import { isLoggedIn } from '@/utils/supabase/auth';
import { ArrowUturnLeftIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { fetchPlace } from '../data';
import PlaceDetails from './place-details';

const PlacePage = async (props: { params: Promise<{ id: string }> }) => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const place = await fetchPlace(+params.id);

  if (!place) {
    return <div>Failed to fetch the place</div>;
  }

  return (
    <>
      <PageHeader>Place Details</PageHeader>
      <PlaceDetails place={place} />

      <Link className="absolute top-4 right-4 link-secondary" href={`/adventure/places`}>
        <ArrowUturnLeftIcon className="w-6" />
      </Link>
      <Link className="absolute bottom-4 right-4" href={`/adventure/places/${place.id}/update`}>
        <button className="btn btn-secondary btn-circle btn-outline">
          <PencilSquareIcon className="w-6" />
        </button>
      </Link>
    </>
  );
};

export default PlacePage;
