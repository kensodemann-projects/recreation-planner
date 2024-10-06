import Address from '@/app/ui/address';
import PageHeader from '@/app/ui/page-header';
import { Place as PlaceModel } from '@/models';

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
        <span className="font-bold">Type:</span> {place.typeName}
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
    </>
  );
};

export default Place;
