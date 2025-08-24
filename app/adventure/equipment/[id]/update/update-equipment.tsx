'use client';

import { Equipment, EquipmentType } from '@/models';
import { useRouter } from 'next/navigation';
import EquipmentEditor from '../../ui/equipment-editor';
import { updateConfirmed } from './actions';

type UpdateEquipmentProperties = { equipment: Equipment; equipmentTypes: EquipmentType[] };

const UpdateEquipment = ({ equipment, equipmentTypes }: UpdateEquipmentProperties) => {
  const router = useRouter();

  return (
    <>
      <EquipmentEditor
        equipment={equipment}
        equipmentTypes={equipmentTypes}
        onConfirm={updateConfirmed}
        onCancel={() => router.back()}
      />
    </>
  );
};

export default UpdateEquipment;
