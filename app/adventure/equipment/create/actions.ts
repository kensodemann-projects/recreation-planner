'use server';

import { redirect } from 'next/navigation';

export const createEquipmentConfirmed = async () => {
  redirect('/adventure/eqipment');
  // if (/* do the saves here */) {
  //   redirect('/adventure/todos');
  // } else {
  //   redirect('/error');
  // }
};
