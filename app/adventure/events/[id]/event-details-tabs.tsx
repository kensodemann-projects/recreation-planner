'use client';

import { Event } from '@/models';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Notes from '../../notes/ui/notes';
import Todos from '../../todos/ui/todos';
import ItineraryItems from './itinerary/ui/itinerary-items';

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
        <Link className="btn btn-primary mt-5" href={`${event.id}/todos/create`} aria-label="Add Todo Collection">
          <PlusCircleIcon className="w-6" />
          Add Todo Collection
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
        <ItineraryItems items={event.itinerary || []} baseHref={`/adventure/events/${event.id}/itinerary`} />
        <Link className="btn btn-primary mt-5" href={`${event.id}/itinerary/create`} aria-label="Add Itinerary Item">
          <PlusCircleIcon className="w-6" />
          Add Itinerary Item
        </Link>
      </section>

      <input type="radio" name="event-tabs" className="tab" aria-label="Notes" defaultChecked={activeTab === 'Notes'} />
      <section className="tab-content">
        <Notes notes={event.notes || []} baseHref={`/adventure/events/${event.id}/notes`} />
        <Link className="btn btn-primary mt-5" href={`${event.id}/notes/create`} aria-label="Add Note">
          <PlusCircleIcon className="w-6" />
          Add Note
        </Link>
      </section>
    </div>
  );
};

export default EventDetailsTabs;
