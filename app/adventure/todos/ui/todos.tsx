'use client';

import { TodoCollection } from '@/models';
import { useState } from 'react';
import TodoCollectionCard from './todo-collection-card';

interface TodosProperties {
  collections: TodoCollection[];
  baseHref: string;
}

const Todos = ({ collections, baseHref }: TodosProperties) => {
  const [showArchived, setShowArchived] = useState(false);

  return (
    <>
      <section className="px-2">
        <div className="w-full text-right">
          <label className="label">
            <input
              type="checkbox"
              checked={showArchived}
              className="toggle"
              onChange={() => setShowArchived((x) => !x)}
            />
            Show Archived
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
          {collections
            .filter((x) => showArchived || !x.isComplete)
            .map((x) => (
              <TodoCollectionCard baseHref={baseHref} todoCollection={x} key={x.id} />
            ))}
        </div>
      </section>
    </>
  );
};

export default Todos;
