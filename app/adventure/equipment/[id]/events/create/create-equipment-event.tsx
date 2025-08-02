'use client';

import { useRouter } from 'next/navigation';
import EquipmentEventEditor from '../ui/equipment-event-editor';
import { createConfirmed } from './actions';
import { Equipment, EquipmentEventType, EquipmentType, UsageUnits } from '@/models';

type CreateEquipmentEventProperties = {
  equipment: Equipment;
  equipmentEventTypes: EquipmentEventType[];
  usageUnits: UsageUnits[];
};

const CreateEquipmentEvent = ({ equipment, equipmentEventTypes, usageUnits }: CreateEquipmentEventProperties) => {
  const router = useRouter();

  return (
    <>
      <EquipmentEventEditor
        equipmentEventTypes={equipmentEventTypes}
        usageUnits={usageUnits}
        onConfirm={(evt) => createConfirmed({ ...evt, equipment })}
        onCancel={() => router.back()}
      />
    </>
  );
};

export default CreateEquipmentEvent;
