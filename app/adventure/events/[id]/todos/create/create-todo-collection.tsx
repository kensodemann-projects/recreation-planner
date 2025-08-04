'use client';

import TodoCollectionEditor from '@/app/adventure/todos/ui/todo-collection-editor';
import { useRouter } from 'next/navigation';
import { createConfirmed } from './actions';

type CreateTodoCollectionProps = {
  eventRid: number | null;
};

const CreateTodoCollection = ({ eventRid }: CreateTodoCollectionProps) => {
  const router = useRouter();

  return (
    <>
      <TodoCollectionEditor
        onConfirm={(collection) => createConfirmed({ ...collection, eventRid })}
        onCancel={() => router.back()}
      />
    </>
  );
};

export default CreateTodoCollection;
