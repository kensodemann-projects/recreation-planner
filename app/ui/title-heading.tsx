interface TitleHeadingProperties {
  children: string | Array<string>;
  className?: string | undefined;
}

const TitleHeading = ({ children, className }: TitleHeadingProperties) => {
  return (
    <>
      <h1 className={'text-2xl ' + className || ''}>{children}</h1>
    </>
  );
};

export default TitleHeading;
