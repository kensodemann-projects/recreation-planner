'use client';

import { TodoCollection } from '@/models';
import { useRouter } from 'next/navigation';
import { updateConfirmed } from './actions';
import TodoCollectionEditor from '@/app/adventure/todos/ui/todo-collection-editor';

type UpdateTodoCollectionProperties = { todoCollection: TodoCollection };

const UpdateTodoCollection = ({ todoCollection }: UpdateTodoCollectionProperties) => {
  const router = useRouter();

  return (
    <>
      <TodoCollectionEditor
        todoCollection={todoCollection}
        onConfirm={updateConfirmed}
        onCancel={() => router.back()}
      />
    </>
  );
};

export default UpdateTodoCollection;
