'use client';

import { Place, PlaceType } from '@/models';
import { useRouter } from 'next/navigation';
import PlaceEditor from '../../ui/place-editor';
import { updateConfirmed } from './actions';

type UpdatePlaceProperties = { place: Place; types: Array<PlaceType> };

const UpdatePlace = ({ place, types }: UpdatePlaceProperties) => {
  const router = useRouter();

  return (
    <>
      <PlaceEditor place={place} types={types} onConfirm={updateConfirmed} onCancel={() => router.back()} />
    </>
  );
};

export default UpdatePlace;
