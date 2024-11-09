'use client';

import { Place, EventType, SelectablePlace } from '@/models';
import { useRouter } from 'next/navigation';
import EventEditor from '../ui/event-editor';

type CreateEventProps = {
  types: Array<EventType>;
  places: Array<SelectablePlace>;
};

const CreateEvent = ({ types, places }: CreateEventProps) => {
  const router = useRouter();

  return (
    <>
      <EventEditor types={types} places={places} onConfirm={() => null} onCancel={() => router.back()} />
    </>
  );
};

export default CreateEvent;
