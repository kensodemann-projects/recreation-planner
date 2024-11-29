'use client';

import CannotDelete from '@/app/ui/cannot-delete';
import ConfirmDelete from '@/app/ui/confirm-delete';
import { Place } from '@/models';
import { deletePlaceAborted, deletePlaceConfirmed } from './actions';

interface DeletePlaceProps {
  place: Place;
  canDelete: boolean;
}

const DeletePlace = ({ place, canDelete }: DeletePlaceProps) => {
  return canDelete ? (
    <ConfirmDelete entityName={place.name} onConfirm={() => deletePlaceConfirmed(place)} onDeny={deletePlaceAborted} />
  ) : (
    <CannotDelete entityName={place.name} onClick={deletePlaceAborted} />
  );
};

export default DeletePlace;
