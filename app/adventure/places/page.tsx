import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { fetchPlaceTypes, fetchPlaces } from './data';
import FilteredPlaces from './filtered-places';

const PlacesPage = async () => {
  const [places, placeTypes] = await Promise.all([fetchPlaces(), fetchPlaceTypes()]);

  return (
    <>
      <PageHeader>
        <TitleHeading>Places</TitleHeading>
      </PageHeader>
      <FilteredPlaces places={places} placeTypes={placeTypes} />
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
