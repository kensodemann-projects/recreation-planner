interface PageHeaderProperties {
  children: React.ReactNode;
  className?: string | undefined;
}

const PageHeader = ({ children, className }: PageHeaderProperties) => {
  return <header className={'text-center mb-8' + (className || '')}>{children}</header>;
};

export default PageHeader;
