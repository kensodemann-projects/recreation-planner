import Title from './title';

const Loading = () => {
  return (
    <>
      <Title />
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="skeleton h-8 w-48"></div>
          <div className="skeleton h-8 w-full"></div>
          <div className="skeleton h-8 w-full"></div>
          <div className="skeleton h-8 w-full"></div>
        </div>
        <div className="space-y-4">
          <div className="skeleton h-8 w-48"></div>
          <div className="skeleton h-8 w-full"></div>
          <div className="skeleton h-8 w-full"></div>
          <div className="skeleton h-8 w-full"></div>
        </div>
        <div className="space-y-4">
          <div className="skeleton h-8 w-48"></div>
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
            <div className="skeleton h-64 w-full"></div>
            <div className="skeleton h-64 w-full"></div>
            <div className="skeleton h-64 w-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
