'use client';

import Message from '@/app/ui/message';
import { Event } from '@/models';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Notes from '../../notes/ui/notes';
import Todos from '../../todos/ui/todos';
import { useSearchParams } from 'next/navigation';

interface EventDetailsTabsProps {
  event: Event;
}

const EventDetailsTabs = ({ event }: EventDetailsTabsProps) => {
  const sp = useSearchParams();
  const activeTab = sp?.get('lastActivity') || 'Todos';
  return (
    <div className="tabs tabs-border mt-5">
      <input type="radio" name="event-tabs" className="tab" aria-label="Todos" defaultChecked={activeTab === 'Todos'} />
      <section className="tab-content">
        <Todos collections={event.todoCollections || []} baseHref={`/adventure/events/${event.id}/todos`} />
        <Link href={`${event.id}/todos/create`}>
          <button className="btn btn-primary mt-5">
            <PlusCircleIcon className="w-6" />
            Add Todo Collection
          </button>
        </Link>
      </section>

      <input
        type="radio"
        name="event-tabs"
        className="tab"
        aria-label="Itinerary"
        defaultChecked={activeTab === 'Itinerary'}
      />
      <section className="tab-content">
        <Message>You have not defined an itinerary for this event.</Message>
      </section>

      <input type="radio" name="event-tabs" className="tab" aria-label="Notes" defaultChecked={activeTab === 'Notes'} />
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
  );
};

export default EventDetailsTabs;
