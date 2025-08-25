'use client';

import { TodoCollection } from '@/models';
import { useRouter, useSearchParams } from 'next/navigation';
import TodoCollectionEditor from '../../ui/todo-collection-editor';
import { updateConfirmed } from './actions';

type UpdateTodoCollectionProperties = { todoCollection: TodoCollection };

const UpdateTodoCollection = ({ todoCollection }: UpdateTodoCollectionProperties) => {
  const router = useRouter();
  const sp = useSearchParams();
  const callingPage = sp?.get('callingPage') || '';

  return (
    <>
      <TodoCollectionEditor
        todoCollection={todoCollection}
        onConfirm={(c: TodoCollection) => updateConfirmed(c, callingPage)}
        onCancel={() => router.back()}
      />
    </>
  );
};

export default UpdateTodoCollection;
