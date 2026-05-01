const SkeletonCardGrid = () => {
  return (
    <>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
        <div className="skeleton h-64 w-full"></div>
        <div className="skeleton h-64 w-full"></div>
        <div className="skeleton h-64 w-full"></div>
      </div>
    </>
  );
};

export default SkeletonCardGrid;
