'use client';

import PageHeader from '@/app/ui/page-header';
import { PlaceType } from '@/models';
import PlaceEditor from '../ui/place-editor';
import { createPlaceConfirmed } from './actions';

const CreatePlace = ({ types }: { types: Array<PlaceType> }) => {
  return (
    <>
      <PageHeader>Add a New Place</PageHeader>
      <PlaceEditor types={types} onConfirm={createPlaceConfirmed} onCancel={() => null} />;
    </>
  );
};

export default CreatePlace;
