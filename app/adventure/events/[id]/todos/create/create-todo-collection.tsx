'use client';

import TodoCollectionEditor from '@/app/adventure/todos/ui/todo-collection-editor';
import { useRouter } from 'next/navigation';
import { createTodoCollectionConfirmed } from './actions';

type CreateTodoCollectionProps = {
  eventRid: number | null | undefined;
};

const CreateTodoCollection = ({ eventRid }: CreateTodoCollectionProps) => {
  const router = useRouter();

  return (
    <>
      <TodoCollectionEditor
        onConfirm={(collection) => createTodoCollectionConfirmed({ ...collection, eventRid })}
        onCancel={() => router.back()}
      />
    </>
  );
};

export default CreateTodoCollection;
