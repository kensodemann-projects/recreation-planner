import Address from '@/app/ui/address';
import LabeledField from '@/app/ui/labeled-field';
import SectionHeader from '@/app/ui/section-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { Place as PlaceModel } from '@/models';
import Notes from '../../notes/ui/notes';
import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

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

      <section>
        <SectionHeader>
          <SubtitleHeading>Notes</SubtitleHeading>
        </SectionHeader>

        <Notes notes={place.notes || []} baseHref={`/adventure/places/${place.id}/notes`} />

        <Link href={`${place.id}/notes/create`}>
          <button className="btn btn-primary">
            <PlusCircleIcon className="w-6" />
            Add Note
          </button>
        </Link>
      </section>
    </>
  );
};

export default Place;
