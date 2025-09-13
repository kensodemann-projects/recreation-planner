'use client';

import TodoCollectionEditor from '@/app/adventure/todos/ui/todo-collection-editor';
import { redirectToEventDetails } from '../utils';
import { createConfirmed } from './actions';

type CreateTodoCollectionProps = {
  eventRid: number;
};

const CreateTodoCollection = ({ eventRid }: CreateTodoCollectionProps) => {
  return (
    <>
      <TodoCollectionEditor
        onConfirm={(collection) => createConfirmed({ ...collection, eventRid })}
        onCancel={() => redirectToEventDetails(eventRid)}
      />
    </>
  );
};

export default CreateTodoCollection;
