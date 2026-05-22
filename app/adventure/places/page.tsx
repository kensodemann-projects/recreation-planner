import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { fetchPlaces } from './data';
import Places from './places';

const PlacesPage = async () => {
  const places = await fetchPlaces();

  return (
    <>
      <PageHeader>
        <TitleHeading>Places</TitleHeading>
      </PageHeader>
      <Places places={places} />
      <Link
        aria-label="Add place"
        title="Add place"
        className="fixed bottom-4 right-4 btn btn-primary btn-circle"
        href="/adventure/places/create"
      >
        <PlusIcon className="w-6" />
      </Link>
    </>
  );
};

export default PlacesPage;
