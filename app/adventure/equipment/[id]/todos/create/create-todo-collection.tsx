'use client';

import TodoCollectionEditor from '@/app/adventure/todos/ui/todo-collection-editor';
import { useRouter } from 'next/navigation';
import { createTodoCollectionConfirmed } from './actions';

type CreateTodoCollectionProps = {
  equipmentRid: number | null | undefined;
};

const CreateTodoCollection = ({ equipmentRid }: CreateTodoCollectionProps) => {
  const router = useRouter();

  return (
    <>
      <TodoCollectionEditor
        onConfirm={(collection) => createTodoCollectionConfirmed({ ...collection, equipmentRid: equipmentRid })}
        onCancel={() => router.back()}
      />
    </>
  );
};

export default CreateTodoCollection;
