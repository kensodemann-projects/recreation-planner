'use client';

import { TodoCollection } from '@/models';
import { useRouter } from 'next/navigation';
import TodoCollectionEditor from '../../ui/todo-collection-editor';
import { updateConfirmed } from './actions';

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
