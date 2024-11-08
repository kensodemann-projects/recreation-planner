import Address from '@/app/ui/address';
import PageHeader from '@/app/ui/page-header';
import { Place as PlaceModel } from '@/models';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const Place = ({ place }: { place: PlaceModel }) => {
  const addressInformation =
    place.address.line1 || place.address.line2 || place.address.city || place.address.state || place.address.postal ? (
      <>
        <h2 className="mt-8 mb-2 text-lg font-bold">Address</h2>
        <Address value={place.address} />
      </>
    ) : undefined;

  return (
    <>
      <PageHeader>{place.name}</PageHeader>
      <div>{place.description}</div>
      {addressInformation}
      <h2 className="mt-8 mb-2 text-lg font-bold">Other Information</h2>
      <div>
        <span className="font-bold">Type:</span> {place.type.name}
      </div>
      {place.phoneNumber && (
        <div>
          <span className="font-bold">Phone Number:</span> {place.phoneNumber}
        </div>
      )}
      {place.website && (
        <div>
          <span className="font-bold">Website:</span>{' '}
          <a className="link" href={place.website} target="_blank">
            {place.website}
          </a>
        </div>
      )}
      <Link href={`/adventure/places/${place.id}/update`}>
        <button className="btn btn-primary btn-circle btn-outline fixed bottom-6 right-6">
          <PencilSquareIcon className="w-6" />
        </button>
      </Link>
    </>
  );
};

export default Place;
