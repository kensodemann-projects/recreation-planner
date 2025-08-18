'use client';

import { Equipment, EquipmentEventType, UsageUnits } from '@/models';
import { useRouter } from 'next/navigation';
import EquipmentEventEditor from '../ui/equipment-event-editor';
import { createConfirmed } from './actions';

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
        onConfirm={(evt) => createConfirmed({ ...evt, equipmentRid: equipment.id! })}
        onCancel={() => router.back()}
      />
    </>
  );
};

export default CreateEquipmentEvent;
