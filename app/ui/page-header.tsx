interface PageHeaderProperties {
  children: string;
  className?: string | undefined;
}

const PageHeader = ({ children, className }: PageHeaderProperties) => {
  return (
    <header>
      <h1 className={'text-2xl text-center mb-8 ' + className || ''}>{children}</h1>
    </header>
  );
};

export default PageHeader;
