'use client';

import { Event, EventType, SelectablePlace } from '@/models';
import { useRouter, useSearchParams } from 'next/navigation';
import EventEditor from '../../ui/event-editor';
import { updateConfirmed } from './actions';

type CreateEventProps = {
  event: Event;
  types: Array<EventType>;
  places: Array<SelectablePlace>;
};

const UpdateEvent = ({ event, types, places }: CreateEventProps) => {
  const router = useRouter();
  const sp = useSearchParams();
  const callingPage = sp?.get('callingPage') || '';

  return (
    <>
      <EventEditor
        event={event}
        types={types}
        places={places}
        onConfirm={(event: Event) => updateConfirmed(event, callingPage)}
        onCancel={() => router.back()}
      />
    </>
  );
};

export default UpdateEvent;
