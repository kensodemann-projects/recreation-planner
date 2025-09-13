'use client';

import TodoCollectionEditor from '@/app/adventure/todos/ui/todo-collection-editor';
import { TodoCollection } from '@/models';
import { redirectToEventDetails } from '../../utils';
import { updateConfirmed } from './actions';

type UpdateTodoCollectionProperties = { todoCollection: TodoCollection };

const UpdateTodoCollection = ({ todoCollection }: UpdateTodoCollectionProperties) => {
  return (
    <>
      <TodoCollectionEditor
        todoCollection={todoCollection}
        onConfirm={updateConfirmed}
        onCancel={() => redirectToEventDetails(todoCollection.eventRid!)}
      />
    </>
  );
};

export default UpdateTodoCollection;
