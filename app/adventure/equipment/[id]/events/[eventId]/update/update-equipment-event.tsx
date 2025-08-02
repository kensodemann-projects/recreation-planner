'use client';

import { EquipmentEvent, EquipmentEventType, UsageUnits } from '@/models';
import { useRouter } from 'next/navigation';
import EquipmentEventEditor from '../../ui/equipment-event-editor';
import { updateConfirmed } from './actions';

type UpdateEquipmentEventProperties = {
  equipmentEvent: EquipmentEvent;
  equipmentEventTypes: EquipmentEventType[];
  usageUnits: UsageUnits[];
};

const UpdateEquipmentEvent = ({ equipmentEvent, equipmentEventTypes, usageUnits }: UpdateEquipmentEventProperties) => {
  const router = useRouter();

  return (
    <>
      <EquipmentEventEditor
        equipmentEvent={equipmentEvent}
        equipmentEventTypes={equipmentEventTypes}
        usageUnits={usageUnits}
        onConfirm={(evt) => updateConfirmed(evt as EquipmentEvent)}
        onCancel={() => router.back()}
      />
    </>
  );
};

export default UpdateEquipmentEvent;
