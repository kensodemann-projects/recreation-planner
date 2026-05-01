'use client';

import { redirectToDetails } from '@/utils/navigation';
import ItineraryItemEditor from '../ui/itinerary-item-editor';
import { createConfirmed } from './actions';

type CreateItineraryItemProps = {
  eventRid: number;
};

const CreateItineraryItem = ({ eventRid }: CreateItineraryItemProps) => {
  return (
    <>
      <ItineraryItemEditor
        onConfirm={(item) => createConfirmed({ ...item, eventRid })}
        onCancel={() => redirectToDetails('events', eventRid, 'Initinerary')}
      />
    </>
  );
};

export default CreateItineraryItem;
