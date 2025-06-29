'use client';

import { Equipment, Place, PlaceType } from '@/models';
import { useRouter } from 'next/navigation';
import EquipmentEditor from '../../ui/equipment-editor';
import { updateEquipmentConfirmed } from './actions';

type UpdateEquipmentProperties = { equipment: Equipment };

const UpdateEquipment = ({ equipment }: UpdateEquipmentProperties) => {
  const router = useRouter();

  return (
    <>
      <EquipmentEditor equipment={equipment} onConfirm={updateEquipmentConfirmed} onCancel={() => router.back()} />
    </>
  );
};

export default UpdateEquipment;
