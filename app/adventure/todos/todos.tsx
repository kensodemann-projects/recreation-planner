import { TodoCollection } from '@/models';
import TodoCollectionCard from './ui/todo-collection-card';

interface TodosProperties {
  collections: TodoCollection[];
}

const Todos = ({ collections }: TodosProperties) => {
  return (
    <>
      <section className="px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
          {collections.map((x) => (
            <TodoCollectionCard editHref={`/adventure/todos/${x.id}/update`} todoCollection={x} key={x.id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Todos;
