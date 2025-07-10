'use client';

import { useRouter } from 'next/navigation';
import EquipmentEventEditor from '../ui/equipment-event-editor';
import { createEquipmentEventConfirmed } from './actions';
import { EquipmentEventType, EquipmentType, UsageUnits } from '@/models';

type CreateEquipmentEventProperties = {
  equipmentRid: number;
  equipmentEventTypes: EquipmentEventType[];
  usageUnits: UsageUnits[];
};

const CreateEquipmentEvent = ({ equipmentRid, equipmentEventTypes, usageUnits }: CreateEquipmentEventProperties) => {
  const router = useRouter();

  return (
    <>
      <EquipmentEventEditor
        equipmentEventTypes={equipmentEventTypes}
        usageUnits={usageUnits}
        onConfirm={(evt) => createEquipmentEventConfirmed({ ...evt, equipmentRid })}
        onCancel={() => router.back()}
      />
    </>
  );
};

export default CreateEquipmentEvent;
