'use client';

import { useRouter } from 'next/navigation';
import TodoCollectionEditor from '../ui/todo-collection-editor';
import { createTodoCollectionConfirmed } from './actions';

const CreateTodoCollection = () => {
  const router = useRouter();

  return (
    <>
      <TodoCollectionEditor onConfirm={createTodoCollectionConfirmed} onCancel={() => router.back()} />
    </>
  );
};

export default CreateTodoCollection;
