'use client';

import { PlaceType } from '@/models';
import { useRouter } from 'next/navigation';
import PlaceEditor from '../ui/place-editor';
import { createConfirmed } from './actions';

const CreatePlace = ({ types }: { types: Array<PlaceType> }) => {
  const router = useRouter();

  return (
    <>
      <PlaceEditor types={types} onConfirm={createConfirmed} onCancel={() => router.back()} />
    </>
  );
};

export default CreatePlace;
