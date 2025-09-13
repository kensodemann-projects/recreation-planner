'use client';

import TodoCollectionEditor from '@/app/adventure/todos/ui/todo-collection-editor';
import { redirectToEquipmentDetails } from '../utils';
import { createConfirmed } from './actions';

type CreateTodoCollectionProps = {
  equipmentRid: number;
};

const CreateTodoCollection = ({ equipmentRid }: CreateTodoCollectionProps) => {
  return (
    <>
      <TodoCollectionEditor
        onConfirm={(collection) => createConfirmed({ ...collection, equipmentRid: equipmentRid })}
        onCancel={() => redirectToEquipmentDetails(equipmentRid)}
      />
    </>
  );
};

export default CreateTodoCollection;
