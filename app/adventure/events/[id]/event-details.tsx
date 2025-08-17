import Address from '@/app/ui/address';
import SectionHeader from '@/app/ui/section-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { Event, Note, TodoCollection } from '@/models';
import { formatDateRange } from '@/utils/formatters';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Todos from '../../todos/ui/todos';
import Notes from '../../notes/ui/notes';

interface EventDetailsProps {
  event: Event;
}

const EventDetails = ({ event }: EventDetailsProps) => {
  const addressInformation =
    event.place.address &&
    (event.place.address.line1 ||
      event.place.address.line2 ||
      event.place.address.city ||
      event.place.address.state ||
      event.place.address.postal) ? (
      <Address value={event.place.address} />
    ) : undefined;

  return (
    <>
      <section>
        <SectionHeader>
          <SubtitleHeading>{event.name}</SubtitleHeading>
        </SectionHeader>
        <div>{event.type.name}</div>
        <div>{formatDateRange(event.beginDate, event.beginTime, event.endDate, event.endTime)}</div>
        <div className="mt-4 whitespace-pre-line">{event.description}</div>
      </section>

      <section>
        <SectionHeader>
          <SubtitleHeading>Location</SubtitleHeading>
        </SectionHeader>
        <div>{event.place.name}</div>
        {addressInformation}
        <div>{event.place.website}</div>
        <div>{event.place.phoneNumber}</div>
      </section>

      <section>
        <SectionHeader>
          <SubtitleHeading>Todos</SubtitleHeading>
        </SectionHeader>
        <Todos collections={event.todoCollections || []} baseHref={`/adventure/events/${event.id}/todos`} />
        <Link href={`${event.id}/todos/create`}>
          <button className="btn btn-primary">
            <PlusCircleIcon className="w-6" />
            Add Todo Collection
          </button>
        </Link>
      </section>

      <section>
        <SectionHeader>
          <SubtitleHeading>Notes</SubtitleHeading>
        </SectionHeader>

        <Notes notes={event.notes || []} baseHref={`/adventure/events/${event.id}/notes`} />

        <Link href={`${event.id}/notes/create`}>
          <button className="btn btn-primary">
            <PlusCircleIcon className="w-6" />
            Add Note
          </button>
        </Link>
      </section>
    </>
  );
};

export default EventDetails;
