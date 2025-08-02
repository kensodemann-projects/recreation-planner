'use client';

import CannotDelete from '@/app/ui/cannot-delete';
import ConfirmDelete from '@/app/ui/confirm-delete';
import { Equipment } from '@/models';
import { deleteAborted, deleteConfirmed } from './actions';

interface DeleteEqipmentProps {
  equipment: Equipment;
  canDelete: boolean;
}

const DeleteEquipment = ({ equipment, canDelete }: DeleteEqipmentProps) => {
  return canDelete ? (
    <ConfirmDelete entityName={equipment.name} onConfirm={() => deleteConfirmed(equipment)} onDeny={deleteAborted} />
  ) : (
    <CannotDelete entityName={equipment.name} onClick={deleteAborted} />
  );
};

export default DeleteEquipment;
