'use client';

import { ItineraryItem } from '@/models';
import { redirectToDetails } from '@/utils/navigation';
import ItineraryItemEditor from '../../ui/itinerary-item-editor';
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
        onCancel={() => redirectToDetails('events', item.eventRid!, 'Itinerary')}
      />
    </>
  );
};

export default UpdateItineraryItem;
