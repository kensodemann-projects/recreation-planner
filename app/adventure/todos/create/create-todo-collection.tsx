'use client';

import { useRouter } from 'next/navigation';
import TodoCollectionEditor from '../ui/todo-collection-editor';
import { createConfirmed } from './actions';

const CreateTodoCollection = () => {
  const router = useRouter();

  return (
    <>
      <TodoCollectionEditor onConfirm={createConfirmed} onCancel={() => router.back()} />
    </>
  );
};

export default CreateTodoCollection;
