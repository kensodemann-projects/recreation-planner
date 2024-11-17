'use client';

import { EventType, SelectablePlace } from '@/models';
import { useRouter } from 'next/navigation';
import EventEditor from '../ui/event-editor';
import { createEventConfirmed } from './actions';

type CreateEventProps = {
  types: Array<EventType>;
  places: Array<SelectablePlace>;
};

const CreateEvent = ({ types, places }: CreateEventProps) => {
  const router = useRouter();

  return (
    <>
      <EventEditor types={types} places={places} onConfirm={createEventConfirmed} onCancel={() => router.back()} />
    </>
  );
};

export default CreateEvent;
