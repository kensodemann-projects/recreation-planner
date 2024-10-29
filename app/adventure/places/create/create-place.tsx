'use client';

import PageHeader from '@/app/ui/page-header';
import { PlaceType } from '@/models';
import PlaceEditor from '../ui/place-editor';
import { createPlaceConfirmed } from './actions';
import { useRouter } from 'next/navigation';

const CreatePlace = ({ types }: { types: Array<PlaceType> }) => {
  const router = useRouter();

  return (
    <>
      <PageHeader>Add a New Place</PageHeader>
      <PlaceEditor types={types} onConfirm={createPlaceConfirmed} onCancel={() => router.back()} />;
    </>
  );
};

export default CreatePlace;
