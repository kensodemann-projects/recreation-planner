interface SectionHeadingProperties {
  children: string | Array<string>;
  className?: string | undefined;
}

const SectionHeading = ({ children, className }: SectionHeadingProperties) => {
  return (
    <>
      <h2 className={'mt-8 mb-2 text-lg font-bold ' + className || ''}>{children}</h2>
    </>
  );
};

export default SectionHeading;
