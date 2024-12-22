'use client';

import EditableCheckbox from '@/app/ui/editable-checkbox';
import { TodoCollection } from '@/models';

export interface TodoCollectionCardProps {
  todoCollection: TodoCollection;
}

const TodoCollectionCard = ({ todoCollection }: TodoCollectionCardProps) => {
  return (
    <div className="card card-border bg-base-100 m-2">
      <div className="card-body">
        <h2 className="card-title">{todoCollection.name}</h2>
        <p>{todoCollection.description}</p>
        <div>
          {todoCollection.todoItems.map((todo) => (
            <EditableCheckbox
              key={todo.id}
              checked={todo.isComplete}
              label={todo.name}
              onChange={(evt) => console.log('change')}
              onLabelChanged={(name) => console.log('label change')}
            />
          ))}
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default TodoCollectionCard;
