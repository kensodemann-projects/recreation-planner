import Address from '@/app/ui/address';
import SectionHeader from '@/app/ui/section-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { Event, TodoCollection } from '@/models';
import { formatDateRange } from '@/utils/formatters';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import TodoCollectionCard from '../../todos/ui/todo-collection-card';

interface EventDetailsProps {
  event: Event;
  todoCollections: TodoCollection[];
}

const EventDetails = ({ event, todoCollections }: EventDetailsProps) => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
          {todoCollections.map((c) => (
            <TodoCollectionCard
              editHref={`/adventure/events/${event.id}/todos/${c.id}/update`}
              todoCollection={c}
              key={c.id}
            />
          ))}
        </div>
        <Link href={`${event.id}/todos/create`}>
          <button className="btn btn-primary">
            <PlusCircleIcon className="w-6" />
            Add Todo Collection
          </button>
        </Link>
      </section>
    </>
  );
};

export default EventDetails;
