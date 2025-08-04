'use client';

import TodoCollectionEditor from '@/app/adventure/todos/ui/todo-collection-editor';
import { useRouter } from 'next/navigation';
import { createConfirmed } from './actions';

type CreateTodoCollectionProps = {
  equipmentRid: number | null;
};

const CreateTodoCollection = ({ equipmentRid }: CreateTodoCollectionProps) => {
  const router = useRouter();

  return (
    <>
      <TodoCollectionEditor
        onConfirm={(collection) => createConfirmed({ ...collection, equipmentRid: equipmentRid })}
        onCancel={() => router.back()}
      />
    </>
  );
};

export default CreateTodoCollection;
