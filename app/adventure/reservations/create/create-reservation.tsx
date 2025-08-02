'use client';

import { useRouter } from 'next/navigation';
import { createConfirmed } from './actions';
import ReservationEditor from '../ui/reservation-editor';

const CreateReservation = () => {
  const router = useRouter();

  return (
    <>
      <ReservationEditor onConfirm={createConfirmed} onCancel={() => router.back()} />
    </>
  );
};

export default CreateReservation;
