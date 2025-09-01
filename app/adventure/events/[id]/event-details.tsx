import Address from '@/app/ui/address';
import SectionHeader from '@/app/ui/section-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { Event } from '@/models';
import { formatDateRange } from '@/utils/formatters';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Notes from '../../notes/ui/notes';
import Todos from '../../todos/ui/todos';

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

      <div className="tabs tabs-border mt-5">
        <input type="radio" name="event-tabs" className="tab" aria-label="Todos" defaultChecked />
        <section className="tab-content">
          <Todos collections={event.todoCollections || []} baseHref={`/adventure/events/${event.id}/todos`} />
          <Link href={`${event.id}/todos/create`}>
            <button className="btn btn-primary mt-5">
              <PlusCircleIcon className="w-6" />
              Add Todo Collection
            </button>
          </Link>
        </section>

        <input type="radio" name="event-tabs" className="tab" aria-label="Notes" />
        <section className="tab-content">
          <Notes notes={event.notes || []} baseHref={`/adventure/events/${event.id}/notes`} />

          <Link href={`${event.id}/notes/create`}>
            <button className="btn btn-primary mt-5">
              <PlusCircleIcon className="w-6" />
              Add Note
            </button>
          </Link>
        </section>
      </div>
    </>
  );
};

export default EventDetails;
