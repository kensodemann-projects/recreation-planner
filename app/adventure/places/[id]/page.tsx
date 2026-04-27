import BackButton from '@/app/ui/back-button';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { fetchPlace } from '../data';
import PlaceDetails from './place-details';

const PlacePage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const place = await fetchPlace(+params.id, true);

  if (!place) {
    return <div>Failed to fetch the place</div>;
  }

  return (
    <>
      <PageHeader>
        <TitleHeading>Place Details</TitleHeading>
      </PageHeader>
      <PlaceDetails place={place} />

      <BackButton defaultHref="/adventure/places" />
    </>
  );
};

export default PlacePage;
