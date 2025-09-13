'use client';

import { EquipmentEvent, EquipmentEventType, UsageUnits } from '@/models';
import EquipmentEventEditor from '../../ui/equipment-event-editor';
import { redirectToEquipmentDetails } from '../../utils';
import { updateConfirmed } from './actions';

type UpdateEquipmentEventProperties = {
  equipmentEvent: EquipmentEvent;
  equipmentEventTypes: EquipmentEventType[];
  usageUnits: UsageUnits[];
};

const UpdateEquipmentEvent = ({ equipmentEvent, equipmentEventTypes, usageUnits }: UpdateEquipmentEventProperties) => {
  return (
    <>
      <EquipmentEventEditor
        equipmentEvent={equipmentEvent}
        equipmentEventTypes={equipmentEventTypes}
        usageUnits={usageUnits}
        onConfirm={(evt) => updateConfirmed(evt as EquipmentEvent)}
        onCancel={() => redirectToEquipmentDetails(equipmentEvent.equipmentRid)}
      />
    </>
  );
};

export default UpdateEquipmentEvent;
