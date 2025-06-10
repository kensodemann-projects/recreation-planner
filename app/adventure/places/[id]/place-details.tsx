import Address from '@/app/ui/address';
import SectionHeader from '@/app/ui/section-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { Place as PlaceModel } from '@/models';

const Place = ({ place }: { place: PlaceModel }) => {
  const addressInformation =
    place.address.line1 || place.address.line2 || place.address.city || place.address.state || place.address.postal ? (
      <section>
        <SectionHeader>
          <SubtitleHeading>Address</SubtitleHeading>
        </SectionHeader>
        <Address value={place.address} />
      </section>
    ) : undefined;

  return (
    <>
      <section>
        <SectionHeader>
          <SubtitleHeading>{place.name}</SubtitleHeading>
        </SectionHeader>
        <div className="whitespace-pre-line">{place.description}</div>
      </section>

      {addressInformation}

      <section>
        <SectionHeader>
          <SubtitleHeading>Other Information</SubtitleHeading>
        </SectionHeader>
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
