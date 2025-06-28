'use client';

import CannotDelete from '@/app/ui/cannot-delete';
import ConfirmDelete from '@/app/ui/confirm-delete';
import { Equipment } from '@/models';
import { deleteEquipmentAborted, deleteEquipmentConfirmed } from './actions';

interface DeleteEventProps {
  equipment: Equipment;
  canDelete: boolean;
}

const DeleteEquipment = ({ equipment, canDelete }: DeleteEventProps) => {
  return canDelete ? (
    <ConfirmDelete
      entityName={equipment.name}
      onConfirm={() => deleteEquipmentConfirmed(equipment)}
      onDeny={deleteEquipmentAborted}
    />
  ) : (
    <CannotDelete entityName={equipment.name} onClick={deleteEquipmentAborted} />
  );
};

export default DeleteEquipment;
