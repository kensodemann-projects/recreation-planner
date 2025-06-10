interface SectionHeaderProperties {
  children: React.ReactNode;
  className?: string | undefined;
}

const SectionHeader = ({ children, className }: SectionHeaderProperties) => {
  return <header className={'mt-8 mb-2 ' + (className || '')}>{children}</header>;
};

export default SectionHeader;
