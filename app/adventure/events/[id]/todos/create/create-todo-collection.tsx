'use client';

import TodoCollectionEditor from '@/app/adventure/todos/ui/todo-collection-editor';
import { redirectToDetails } from '@/utils/navigation';
import { createConfirmed } from './actions';

type CreateTodoCollectionProps = {
  eventRid: number;
};

const CreateTodoCollection = ({ eventRid }: CreateTodoCollectionProps) => {
  return (
    <>
      <TodoCollectionEditor
        onConfirm={(collection) => createConfirmed({ ...collection, eventRid })}
        onCancel={() => redirectToDetails('events', eventRid, 'Todos')}
      />
    </>
  );
};

export default CreateTodoCollection;
