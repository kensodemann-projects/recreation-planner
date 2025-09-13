'use server';

import { deleteTodoCollection } from '@/app/adventure/todos/data';
import { TodoCollection } from '@/models';
import { redirectToEquipmentDetails } from '../../utils';

export const deleteConfirmed = async (equipmentId: number, c: TodoCollection) => {
  await deleteTodoCollection(c);
  redirectToEquipmentDetails(equipmentId);
};

export const deleteAborted = async (equipmentId: number) => {
  redirectToEquipmentDetails(equipmentId);
};
