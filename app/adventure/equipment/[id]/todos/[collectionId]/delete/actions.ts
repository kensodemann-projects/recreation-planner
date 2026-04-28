'use server';

import { deleteTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirect } from 'next/navigation';
import { redirectToEquipmentDetails } from '../../utils';

export const deleteConfirmed = async (equipmentId: number, c: TodoCollection) => {
  if (await deleteTodoCollection(c)) {
    redirectToEquipmentDetails(equipmentId);
  } else {
    redirect('/error');
  }
};

export const deleteAborted = async (equipmentId: number) => {
  redirectToEquipmentDetails(equipmentId);
};
