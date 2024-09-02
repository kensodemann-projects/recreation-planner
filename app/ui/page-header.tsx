const PageHeader = ({ children }: { children: string }) => {
  return (
    <header>
      <h1 className="text-4xl">{children}</h1>
    </header>
  );
};

export default PageHeader;
