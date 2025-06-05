'use client';

import { useRouter } from 'next/navigation';
import EquipmentEditor from '../ui/equipment-editor';
import { createEquipmentConfirmed } from './actions';

const CreateEquipment = () => {
  const router = useRouter();

  return (
    <>
      <EquipmentEditor onConfirm={createEquipmentConfirmed} onCancel={() => router.back()} />
    </>
  );
};

export default CreateEquipment;
