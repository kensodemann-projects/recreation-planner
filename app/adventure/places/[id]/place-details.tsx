import Address from '@/app/ui/address';
import SectionHeading from '@/app/ui/section-heading';
import { Place as PlaceModel } from '@/models';

const Place = ({ place }: { place: PlaceModel }) => {
  const addressInformation =
    place.address.line1 || place.address.line2 || place.address.city || place.address.state || place.address.postal ? (
      <section>
        <SectionHeading>Address</SectionHeading>
        <Address value={place.address} />
      </section>
    ) : undefined;

  return (
    <>
      <section>
        <SectionHeading>{place.name}</SectionHeading>
        <div className="whitespace-pre-line">{place.description}</div>
      </section>

      {addressInformation}

      <section>
        <SectionHeading>Other Information</SectionHeading>
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
      </section>
    </>
  );
};

export default Place;
