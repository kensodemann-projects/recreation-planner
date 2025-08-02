'use client';

import CannotDelete from '@/app/ui/cannot-delete';
import ConfirmDelete from '@/app/ui/confirm-delete';
import { Place } from '@/models';
import { deleteAborted, deleteConfirmed } from './actions';

interface DeletePlaceProps {
  place: Place;
  canDelete: boolean;
}

const DeletePlace = ({ place, canDelete }: DeletePlaceProps) => {
  return canDelete ? (
    <ConfirmDelete entityName={place.name} onConfirm={() => deleteConfirmed(place)} onDeny={deleteAborted} />
  ) : (
    <CannotDelete entityName={place.name} onClick={deleteAborted} />
  );
};

export default DeletePlace;
