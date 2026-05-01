'use client';

import TodoCollectionEditor from '@/app/adventure/todos/ui/todo-collection-editor';
import { TodoCollection } from '@/models';
import { updateConfirmed } from './actions';
import { redirectToDetails } from '@/utils/navigation';

type UpdateTodoCollectionProperties = { todoCollection: TodoCollection };

const UpdateTodoCollection = ({ todoCollection }: UpdateTodoCollectionProperties) => {
  return (
    <>
      <TodoCollectionEditor
        todoCollection={todoCollection}
        onConfirm={updateConfirmed}
        onCancel={() => redirectToDetails('equipment', todoCollection.equipmentRid!, 'Todos')}
      />
    </>
  );
};

export default UpdateTodoCollection;
