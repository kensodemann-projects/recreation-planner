'use client';

import EditableCheckbox from '@/app/ui/editable-checkbox';
import { TodoCollection, TodoItem } from '@/models';
import { addTodoItem, updateTodoItem } from '../data';
import { useState } from 'react';
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline';

export interface TodoCollectionCardProps {
  todoCollection: TodoCollection;
}

const TodoCollectionCard = ({ todoCollection }: TodoCollectionCardProps) => {
  const [todoItems, setTodoItems] = useState(todoCollection.todoItems);

  const addItemClicked = async () => {
    const item = await addTodoItem({ isComplete: false, name: '', todoCollectionRid: todoCollection.id! });
    if (item) {
      setTodoItems((items) => [...items, item]);
    }
  };

  const todoChanged = (todo: TodoItem) => {
    updateTodoItem(todo);
    const items = [...todoItems];
    const idx = items.findIndex((i) => i.id === todo.id);
    items[idx] = todo;
    setTodoItems(items);
  };

  return (
    <div className="card card-border bg-base-100 m-2">
      <div className="card-body">
        <h2 className="card-title">{todoCollection.name}</h2>
        <p>{todoCollection.description}</p>
        <div>
          {todoItems
            .filter((todo) => !todo.isComplete)
            .map((todo) => (
              <EditableCheckbox
                key={todo.id}
                checked={todo.isComplete}
                label={todo.name}
                onChange={(evt) => todoChanged({ ...todo, isComplete: evt.target.checked })}
                onLabelChanged={(name) => todoChanged({ ...todo, name })}
              />
            ))}
          {todoItems
            .filter((todo) => todo.isComplete)
            .map((todo) => (
              <EditableCheckbox
                key={todo.id}
                checked={todo.isComplete}
                label={todo.name}
                onChange={(evt) => todoChanged({ ...todo, isComplete: evt.target.checked })}
                onLabelChanged={(name) => todoChanged({ ...todo, name })}
              />
            ))}
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary btn-outline btn-circle" aria-label="Edit the collection">
            <PencilSquareIcon className="w-6" />
          </button>
          <button
            className="btn btn-primary btn-outline btn-circle"
            aria-label="Add new Todo Item"
            onClick={addItemClicked}
          >
            <PlusIcon className="w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCollectionCard;
