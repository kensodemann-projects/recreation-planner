'use client';

import { useRouter } from 'next/navigation';
import EquipmentEditor from '../ui/equipment-editor';
import { createEquipmentConfirmed } from './actions';
import { EquipmentType } from '@/models';

type CreateEquipmentProperties = { equipmentTypes: EquipmentType[] };

const CreateEquipment = ({ equipmentTypes }: CreateEquipmentProperties) => {
  const router = useRouter();

  return (
    <>
      <EquipmentEditor
        equipmentTypes={equipmentTypes}
        onConfirm={createEquipmentConfirmed}
        onCancel={() => router.back()}
      />
    </>
  );
};

export default CreateEquipment;
