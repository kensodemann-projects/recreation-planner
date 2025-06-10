import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isLoggedIn } from '@/utils/supabase/auth';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
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
      <PageHeader>
        <TitleHeading>Place Details</TitleHeading>
      </PageHeader>
      <PlaceDetails place={place} />

      <Link className="fixed top-4 right-4 link-secondary" href={`/adventure/places`}>
        <ArrowUturnLeftIcon className="w-6" />
      </Link>
    </>
  );
};

export default PlacePage;
