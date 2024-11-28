'use client';

import { Event, EventType, SelectablePlace } from '@/models';
import { useRouter } from 'next/navigation';
import EventEditor from '../../ui/event-editor';
import { updateEventConfirmed } from './actions';

type CreateEventProps = {
  event: Event;
  types: Array<EventType>;
  places: Array<SelectablePlace>;
};

const UpdateEvent = ({ event, types, places }: CreateEventProps) => {
  const router = useRouter();

  return (
    <>
      <EventEditor
        event={event}
        types={types}
        places={places}
        onConfirm={updateEventConfirmed}
        onCancel={() => router.back()}
      />
    </>
  );
};

export default UpdateEvent;
