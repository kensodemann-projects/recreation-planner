'use client';

import TodoCollectionEditor from '@/app/adventure/todos/ui/todo-collection-editor';
import { redirectToDetails } from '@/utils/navigation';
import { createConfirmed } from './actions';

type CreateTodoCollectionProps = {
  equipmentRid: number;
};

const CreateTodoCollection = ({ equipmentRid }: CreateTodoCollectionProps) => {
  return (
    <>
      <TodoCollectionEditor
        onConfirm={(collection) => createConfirmed({ ...collection, equipmentRid: equipmentRid })}
        onCancel={() => redirectToDetails('equipment', equipmentRid, 'Todos')}
      />
    </>
  );
};

export default CreateTodoCollection;
