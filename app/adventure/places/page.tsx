import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import { isLoggedIn } from '@/utils/supabase/auth';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { fetchPlaces } from './data';
import Places from './places';

const PlacesPage = async () => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const places = await fetchPlaces();

  return (
    <>
      <PageHeader>Places</PageHeader>
      <Places places={places} />;
      <Link className="absolute bottom-4 right-4" href="/adventure/places/create">
        <button className="btn btn-secondary btn-circle btn-outline">
          <PlusIcon className="w-6" />
        </button>
      </Link>
    </>
  );
};

export default PlacesPage;
