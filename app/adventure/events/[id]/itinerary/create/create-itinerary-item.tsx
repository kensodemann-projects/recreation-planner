'use client';

import ItineraryItemEditor from '../ui/itinerary-item-editor';
import { redirectToEventDetails } from '../utils';
import { createConfirmed } from './actions';

type CreateItineraryItemProps = {
  eventRid: number;
};

const CreateItineraryItem = ({ eventRid }: CreateItineraryItemProps) => {
  return (
    <>
      <ItineraryItemEditor
        onConfirm={(item) => createConfirmed({ ...item, eventRid })}
        onCancel={() => redirectToEventDetails(eventRid)}
      />
    </>
  );
};

export default CreateItineraryItem;
