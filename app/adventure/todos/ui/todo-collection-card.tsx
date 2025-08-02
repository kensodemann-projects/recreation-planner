'use client';

import EditableCheckbox from '@/app/ui/editable-checkbox';
import { TodoCollection, TodoItem } from '@/models';
import { formatDate } from '@/utils/formatters';
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { addTodoItem, deleteTodoItem, updateTodoCollection, updateTodoItem } from '../data';

export interface TodoCollectionCardProps {
  editHref: string;
  todoCollection: TodoCollection;
}

const TodoCollectionCard = ({ editHref, todoCollection }: TodoCollectionCardProps) => {
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

  const removeTodoItem = (todo: TodoItem) => {
    deleteTodoItem(todo);
    const items = todoItems.filter((x) => x.id !== todo.id);
    setTodoItems(items);
  };

  const DueDate = todoCollection.dueDate ? (
    <p className="grow-0">
      <span className="font-bold">Due Date:</span> {todoCollection.dueDate ? formatDate(todoCollection.dueDate) : null}
    </p>
  ) : null;

  return (
    <div className="card card-border bg-base-100 m-2">
      <div className="card-body">
        <h3 className="card-title">{todoCollection.name}</h3>
        <p className="grow-0">{todoCollection.description}</p>
        {DueDate}
        <div className="grow" data-testid="todo-items">
          {todoItems
            .filter((todo) => !todo.isComplete)
            .map((todo) => (
              <EditableCheckbox
                key={todo.id}
                checked={todo.isComplete}
                label={todo.name}
                onChange={(evt) => todoChanged({ ...todo, isComplete: evt.target.checked })}
                onLabelChanged={(name) => todoChanged({ ...todo, name })}
                onRemove={() => removeTodoItem(todo)}
                removeVerification={todo.name && 'Removing this TODO is permanent and cannot be undone.'}
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
                onRemove={() => null}
                removeVerification={todo.name && 'Removing this TODO is permanent and cannot be undone.'}
              />
            ))}
        </div>
        <div className="card-actions justify-end items-center mt-6">
          <Link href={editHref}>
            <button className="btn btn-secondary btn-outline btn-circle" aria-label="Edit the collection">
              <PencilSquareIcon className="w-6" />
            </button>
          </Link>
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
