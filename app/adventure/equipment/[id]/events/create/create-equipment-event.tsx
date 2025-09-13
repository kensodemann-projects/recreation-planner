'use client';

import { Equipment, EquipmentEventType, UsageUnits } from '@/models';
import EquipmentEventEditor from '../ui/equipment-event-editor';
import { redirectToEquipmentDetails } from '../utils';
import { createConfirmed } from './actions';

type CreateEquipmentEventProperties = {
  equipment: Equipment;
  equipmentEventTypes: EquipmentEventType[];
  usageUnits: UsageUnits[];
};

const CreateEquipmentEvent = ({ equipment, equipmentEventTypes, usageUnits }: CreateEquipmentEventProperties) => {
  return (
    <>
      <EquipmentEventEditor
        equipmentEventTypes={equipmentEventTypes}
        usageUnits={usageUnits}
        onConfirm={(evt) => createConfirmed({ ...evt, equipmentRid: equipment.id! })}
        onCancel={() => redirectToEquipmentDetails(equipment.id!)}
      />
    </>
  );
};

export default CreateEquipmentEvent;
