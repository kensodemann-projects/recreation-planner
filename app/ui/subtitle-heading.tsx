interface SubtitleHeadingProperties {
  children: string | Array<string>;
  className?: string | undefined;
}

const SubtitleHeading = ({ children, className }: SubtitleHeadingProperties) => {
  return (
    <>
      <h2 className={'text-xl font-light mt-2 ' + className || ''}>{children}</h2>
    </>
  );
};

export default SubtitleHeading;
