'use client';

import { ItineraryItem } from '@/models';
import ItineraryItemEditor from '../../ui/itinerary-item-editor';
import { redirectToEventDetails } from '../../utils';
import { updateConfirmed } from './actions';

type UpdateItineraryItemProperties = {
  item: ItineraryItem;
};

const UpdateItineraryItem = ({ item }: UpdateItineraryItemProperties) => {
  return (
    <>
      <ItineraryItemEditor
        item={item}
        onConfirm={(evt) => updateConfirmed(evt as ItineraryItem)}
        onCancel={() => redirectToEventDetails(item.eventRid!)}
      />
    </>
  );
};

export default UpdateItineraryItem;
