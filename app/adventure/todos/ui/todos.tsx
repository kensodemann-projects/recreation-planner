'use client';

import { TodoCollection } from '@/models';
import { useState } from 'react';
import TodoCollectionCard from './todo-collection-card';

interface TodosProperties {
  collections: TodoCollection[];
  baseHref: string;
  disableArchived?: boolean;
  callingPage?: string;
}

const Todos = ({ collections, baseHref, callingPage, disableArchived }: TodosProperties) => {
  const [showArchived, setShowArchived] = useState(false);

  return (
    <>
      <section className="md:px-2">
        {disableArchived ? undefined : (
          <div className="w-full text-right mb-2">
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
        )}
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
          {collections
            .filter((x) => showArchived || !x.isComplete)
            .map((x) => (
              <TodoCollectionCard baseHref={baseHref} todoCollection={x} key={x.id} callingPage={callingPage} />
            ))}
        </div>
      </section>
    </>
  );
};

export default Todos;
