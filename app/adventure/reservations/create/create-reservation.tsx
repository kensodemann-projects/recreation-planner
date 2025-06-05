'use client';

import { useRouter } from 'next/navigation';
import { createReservationConfirmed } from './actions';
import ReservationEditor from '../ui/reservation-editor';

const CreateReservation = () => {
  const router = useRouter();

  return (
    <>
      <ReservationEditor onConfirm={createReservationConfirmed} onCancel={() => router.back()} />
    </>
  );
};

export default CreateReservation;
