'use client';

import EditableCheckbox from '@/app/ui/editable-checkbox';
import { TodoCollection, TodoItem } from '@/models';
import { formatDate } from '@/utils/formatters';
import { PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { addTodoItem, deleteTodoItem, updateTodoItem } from '../data';

export interface TodoCollectionCardProps {
  baseHref: string;
  todoCollection: TodoCollection;
  callingPage?: string;
}

const TodoCollectionCard = ({ baseHref, callingPage, todoCollection }: TodoCollectionCardProps) => {
  const [todoItems, setTodoItems] = useState(todoCollection.todoItems);
  const searchParams = callingPage ? `?callingPage=${callingPage}` : '';

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

  const Association = todoCollection.equipment ? (
    <p className="grow-0">
      <span className="font-bold">For Equipment:</span> {todoCollection.equipment.name}
    </p>
  ) : todoCollection.event ? (
    <p className="grow-0">
      <span className="font-bold">For Event:</span> {todoCollection.event.name}
    </p>
  ) : undefined;

  const DueDate = todoCollection.dueDate ? (
    <p className="grow-0">
      <span className="font-bold">Due Date:</span> {formatDate(todoCollection.dueDate)}
    </p>
  ) : null;

  return (
    <div className="card card-border bg-base-100">
      <div className="card-body">
        <h3 className="card-title">{todoCollection.name}</h3>
        {Association}
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
          <Link href={`${baseHref}/${todoCollection.id}/delete${searchParams}`}>
            <button className="btn btn-error btn-outline btn-circle" aria-label="Delete the collection">
              <TrashIcon className="w-6" />
            </button>
          </Link>
          <Link href={`${baseHref}/${todoCollection.id}/update${searchParams}`}>
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
