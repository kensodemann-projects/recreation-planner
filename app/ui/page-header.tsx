const PageHeader = ({ children, className }: { children: string; className?: string | undefined }) => {
  return (
    <header>
      <h1 className={'text-2xl text-center mb-8 ' + className || ''}>{children}</h1>
    </header>
  );
};

export default PageHeader;
