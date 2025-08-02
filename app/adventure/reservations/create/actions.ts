'use server';

import { redirect } from 'next/navigation';

export const createConfirmed = async () => {
  redirect('/adventure/reservations');
  // if (/* do the saves here */) {
  //   redirect('/adventure/todos');
  // } else {
  //   redirect('/error');
  // }
};
