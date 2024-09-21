const PageHeader = ({ children, className }: { children: string; className?: string | undefined }) => {
  return (
    <header>
      <h1 className={'text-2xl ' + className || ''}>{children}</h1>
    </header>
  );
};

export default PageHeader;
