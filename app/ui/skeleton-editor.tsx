const SkeletonEditor = () => {
  return (
    <>
      <div className="grid gap-4 grid-cols-2">
        <div className="skeleton h-8 w-full col-span-2 md:col-span-1"></div>
        <div className="skeleton h-8 w-full col-span-2 md:col-span-1"></div>
        <div className="skeleton h-24 w-full col-span-2 "></div>
        <div className="skeleton h-8 w-full col-span-2 "></div>
        <div className="skeleton h-8 w-full col-span-2 "></div>
      </div>
    </>
  );
};

export default SkeletonEditor;
