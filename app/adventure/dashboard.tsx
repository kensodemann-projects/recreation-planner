'use client';

import { useState } from 'react';
import EditableCheckbox from '../ui/editable-checkbox';
import { TodoItem } from '@/models';

const Dashboard = () => {
  const [todos, setTodos] = useState<Array<TodoItem>>([
    { id: 1, name: 'this is a test todo', isComplete: false },
    { id: 3, name: 'this is another todo', isComplete: true },
    { id: 8, name: 'and yet another', isComplete: false },
  ]);

  const updateTodo = (todo: TodoItem) => {
    setTodos((arr) => {
      const idx = arr.findIndex((t) => t.id === todo.id);
      if (idx > -1) {
        arr[idx].name = todo.name;
        arr[idx].isComplete = todo.isComplete;
      }
      return [...arr];
    });
  };

  return (
    <>
      <section className="p-4">
        <p>
          Right now, this layout is in flux. This should be more of a dashboard showing several items, but I am not sure
          what.
        </p>
        <div className="mt-4">
          Ideas may include:
          <ul className="list-disc list-inside">
            <li>Next X trips / events</li>
            <li>Top X ToDos</li>
            <li>Wishlists (if we have them for EQ for example)</li>
          </ul>
        </div>
        <p className="mt-4">
          It may also make sense to make a bunch of cards with information such as &quot;You have X upcoming
          events&quot; and &quot;You have Y overdue ToDo items&quot; etc.
        </p>
        {todos.map((todo) => (
          <EditableCheckbox
            key={todo.id}
            checked={todo.isComplete}
            label={todo.name}
            onChange={(evt) => updateTodo({ ...todo, isComplete: evt.target.checked })}
            onLabelChanged={(name) => updateTodo({ ...todo, name })}
          />
        ))}
      </section>
    </>
  );
};

export default Dashboard;
