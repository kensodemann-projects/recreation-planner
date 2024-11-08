'use client';

import PageHeader from '@/app/ui/page-header';
import { Place, PlaceType } from '@/models';
import { useRouter } from 'next/navigation';
import PlaceEditor from '../../ui/place-editor';
import { updatePlaceConfirmed } from './actions';

type UpdatePlaceProperties = { place: Place; types: Array<PlaceType> };

const UpdatePlace = ({ place, types }: UpdatePlaceProperties) => {
  const router = useRouter();

  return (
    <>
      <PageHeader>Update the Place</PageHeader>
      <PlaceEditor place={place} types={types} onConfirm={updatePlaceConfirmed} onCancel={() => router.back()} />
    </>
  );
};

export default UpdatePlace;
