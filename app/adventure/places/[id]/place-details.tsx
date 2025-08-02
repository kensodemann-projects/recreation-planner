import Address from '@/app/ui/address';
import LabeledField from '@/app/ui/labeled-field';
import SectionHeader from '@/app/ui/section-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { Place as PlaceModel } from '@/models';

const Place = ({ place }: { place: PlaceModel }) => {
  const addressInformation = place.address ? (
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
        <LabeledField label="Type">{place.type.name}</LabeledField>
        {place.phoneNumber && <LabeledField label="Phone Number">{place.phoneNumber}</LabeledField>}
        {place.website && (
          <LabeledField label="Website">
            <a className="link" href={place.website} target="_blank">
              {place.website}
            </a>
          </LabeledField>
        )}
      </section>
    </>
  );
};

export default Place;
